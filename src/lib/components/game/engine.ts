export const TILE = 32;

const LEVEL = [
	'',
	'                                                                    C',
	'                                                   C               BBB               C',
	'              C        C C        C              B   B         C                    BBB',
	'              B   C   BBBBB       B    C        BB   BB       BBB',
	'             BB               B   B   BBB      BBB   BBB                 BB',
	'  P   C C   BBB               B   B           BBBB   BBBB                       BB        C C     F',
	'#################   #################     ########   ###################    ############################',
	'#################   #################     ########   ###################    ############################'
];

const GRAVITY = 2000;
const MAX_FALL_SPEED = 900;
const MOVE_SPEED = 230;
const GROUND_ACCELERATION = 2400;
const AIR_ACCELERATION = 1400;
const JUMP_VELOCITY = 680;
const JUMP_CUT_VELOCITY = 300;
const COYOTE_TIME = 0.08;
const JUMP_BUFFER_TIME = 0.12;
const PLAYER_WIDTH = 22;
const PLAYER_HEIGHT = 38;
const SPRITE_WIDTH = 30;
const SPRITE_HEIGHT = 43;
const FLAG_HEIGHT_IN_TILES = 5;

export type GameInput = { left: boolean; right: boolean; jump: boolean };
export type GameStatus = 'playing' | 'won';
export type GameStats = { carrots: number; totalCarrots: number; time: number };
export type Palette = {
	sky: string;
	ground: string;
	groundTop: string;
	block: string;
	blockEdge: string;
	carrot: string;
	leaf: string;
	flag: string;
	pole: string;
};

type Cell = { col: number; row: number };

const rows = LEVEL.length;
const cols = Math.max(...LEVEL.map((line) => line.length));
const grid = LEVEL.map((line) => [...line.padEnd(cols)]);

function findCells(char: string): Cell[] {
	return grid.flatMap((line, row) =>
		line.flatMap((value, col) => (value === char ? [{ col, row }] : []))
	);
}

const [spawn] = findCells('P');
const [flag] = findCells('F');
const carrots = findCells('C');

export const WORLD_WIDTH = cols * TILE;
export const WORLD_HEIGHT = rows * TILE;

function isSolid(col: number, row: number) {
	if (col < 0 || col >= cols) return true;
	if (row < 0 || row >= rows) return false;
	return grid[row][col] === '#' || grid[row][col] === 'B';
}

function overlaps(
	a: { x: number; y: number; w: number; h: number },
	b: { x: number; y: number; w: number; h: number }
) {
	return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function approach(value: number, target: number, delta: number) {
	return value < target ? Math.min(value + delta, target) : Math.max(value - delta, target);
}

export function createGame(sprite: HTMLImageElement) {
	const player = {
		x: 0,
		y: 0,
		w: PLAYER_WIDTH,
		h: PLAYER_HEIGHT,
		vx: 0,
		vy: 0,
		facing: 1,
		onGround: false,
		coyote: 0,
		jumpBuffer: 0
	};
	const collected = new Set<number>();
	let status: GameStatus = 'playing';
	let time = 0;

	function respawn() {
		player.x = spawn.col * TILE + (TILE - PLAYER_WIDTH) / 2;
		player.y = (spawn.row + 1) * TILE - PLAYER_HEIGHT;
		player.vx = 0;
		player.vy = 0;
		player.facing = 1;
		player.onGround = false;
	}

	function reset() {
		collected.clear();
		status = 'playing';
		time = 0;
		respawn();
	}

	function moveX(dx: number) {
		player.x += dx;
		const top = Math.floor(player.y / TILE);
		const bottom = Math.floor((player.y + player.h - 0.001) / TILE);
		const col =
			dx > 0 ? Math.floor((player.x + player.w - 0.001) / TILE) : Math.floor(player.x / TILE);

		for (let row = top; row <= bottom; row++) {
			if (!isSolid(col, row)) continue;
			player.x = dx > 0 ? col * TILE - player.w : (col + 1) * TILE;
			player.vx = 0;
			return;
		}
	}

	function moveY(dy: number) {
		player.y += dy;
		player.onGround = false;
		const left = Math.floor(player.x / TILE);
		const right = Math.floor((player.x + player.w - 0.001) / TILE);
		const row =
			dy > 0 ? Math.floor((player.y + player.h - 0.001) / TILE) : Math.floor(player.y / TILE);

		for (let col = left; col <= right; col++) {
			if (!isSolid(col, row)) continue;
			if (dy > 0) {
				player.y = row * TILE - player.h;
				player.onGround = true;
			} else {
				player.y = (row + 1) * TILE;
			}
			player.vy = 0;
			return;
		}
	}

	function collectCarrots() {
		carrots.forEach(({ col, row }, index) => {
			if (collected.has(index)) return;
			const hitbox = { x: col * TILE + 8, y: row * TILE + 4, w: 16, h: 24 };
			if (overlaps(player, hitbox)) collected.add(index);
		});
	}

	function reachFlag() {
		const pole = {
			x: flag.col * TILE + 12,
			y: (flag.row + 1 - FLAG_HEIGHT_IN_TILES) * TILE,
			w: 8,
			h: FLAG_HEIGHT_IN_TILES * TILE
		};
		if (overlaps(player, pole)) status = 'won';
	}

	function pressJump() {
		player.jumpBuffer = JUMP_BUFFER_TIME;
	}

	function step(dt: number, input: GameInput) {
		if (status === 'won') return;
		time += dt;

		const direction = Number(input.right) - Number(input.left);
		const acceleration = player.onGround ? GROUND_ACCELERATION : AIR_ACCELERATION;
		player.vx = approach(player.vx, direction * MOVE_SPEED, acceleration * dt);
		if (direction) player.facing = direction;

		player.coyote = player.onGround ? COYOTE_TIME : Math.max(0, player.coyote - dt);
		player.jumpBuffer = Math.max(0, player.jumpBuffer - dt);

		if (player.jumpBuffer > 0 && player.coyote > 0) {
			player.vy = -JUMP_VELOCITY;
			player.jumpBuffer = 0;
			player.coyote = 0;
		}

		if (!input.jump && player.vy < -JUMP_CUT_VELOCITY) player.vy = -JUMP_CUT_VELOCITY;
		player.vy = Math.min(player.vy + GRAVITY * dt, MAX_FALL_SPEED);

		moveX(player.vx * dt);
		moveY(player.vy * dt);

		if (player.y > WORLD_HEIGHT + TILE * 2) respawn();

		collectCarrots();
		reachFlag();
	}

	function drawTile(ctx: CanvasRenderingContext2D, col: number, row: number, palette: Palette) {
		const x = col * TILE;
		const y = row * TILE;
		const value = grid[row][col];

		if (value === '#') {
			ctx.fillStyle = palette.ground;
			ctx.fillRect(x, y, TILE, TILE);
			if (!isSolid(col, row - 1)) {
				ctx.fillStyle = palette.groundTop;
				ctx.fillRect(x, y, TILE, 6);
			}
		}

		if (value === 'B') {
			ctx.fillStyle = palette.blockEdge;
			ctx.fillRect(x, y, TILE, TILE);
			ctx.fillStyle = palette.block;
			ctx.fillRect(x + 3, y + 3, TILE - 6, TILE - 6);
			ctx.fillStyle = palette.blockEdge;
			ctx.fillRect(x + 12, y + 12, 8, 8);
		}
	}

	function drawCarrot(ctx: CanvasRenderingContext2D, { col, row }: Cell, palette: Palette) {
		const x = col * TILE + TILE / 2;
		const y = row * TILE + 8 + Math.sin(time * 4 + col) * 2;

		ctx.fillStyle = palette.leaf;
		ctx.beginPath();
		ctx.ellipse(x - 3, y - 2, 2.5, 6, -0.5, 0, Math.PI * 2);
		ctx.ellipse(x + 3, y - 2, 2.5, 6, 0.5, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = palette.carrot;
		ctx.beginPath();
		ctx.moveTo(x - 6, y + 2);
		ctx.lineTo(x + 6, y + 2);
		ctx.lineTo(x, y + 20);
		ctx.closePath();
		ctx.fill();
	}

	function drawFlag(ctx: CanvasRenderingContext2D, palette: Palette) {
		const x = flag.col * TILE + 14;
		const bottom = (flag.row + 1) * TILE;
		const top = bottom - FLAG_HEIGHT_IN_TILES * TILE;
		const flagY = status === 'won' ? top + 4 : bottom - TILE * 1.5;

		ctx.fillStyle = palette.pole;
		ctx.fillRect(x, top, 4, bottom - top);
		ctx.beginPath();
		ctx.arc(x + 2, top, 5, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = palette.flag;
		ctx.beginPath();
		ctx.moveTo(x + 4, flagY);
		ctx.lineTo(x + 34, flagY + 12);
		ctx.lineTo(x + 4, flagY + 24);
		ctx.closePath();
		ctx.fill();
	}

	function drawPlayer(ctx: CanvasRenderingContext2D) {
		const centerX = player.x + player.w / 2;
		const bottom = player.y + player.h;

		ctx.save();
		ctx.translate(Math.round(centerX), Math.round(bottom));
		ctx.scale(-player.facing, 1);
		if (sprite.complete && sprite.naturalWidth) {
			ctx.drawImage(sprite, -SPRITE_WIDTH / 2, -SPRITE_HEIGHT, SPRITE_WIDTH, SPRITE_HEIGHT);
		}
		ctx.restore();
	}

	function render(ctx: CanvasRenderingContext2D, viewWidth: number, palette: Palette) {
		const cameraX =
			viewWidth >= WORLD_WIDTH
				? (WORLD_WIDTH - viewWidth) / 2
				: Math.min(Math.max(player.x + player.w / 2 - viewWidth / 2, 0), WORLD_WIDTH - viewWidth);

		ctx.fillStyle = palette.sky;
		ctx.fillRect(0, 0, viewWidth, WORLD_HEIGHT);

		ctx.save();
		ctx.translate(-Math.round(cameraX), 0);

		const firstCol = Math.max(0, Math.floor(cameraX / TILE));
		const lastCol = Math.min(cols - 1, Math.ceil((cameraX + viewWidth) / TILE));
		for (let row = 0; row < rows; row++) {
			for (let col = firstCol; col <= lastCol; col++) drawTile(ctx, col, row, palette);
		}

		carrots.forEach((cell, index) => {
			if (!collected.has(index)) drawCarrot(ctx, cell, palette);
		});
		drawFlag(ctx, palette);
		drawPlayer(ctx);

		ctx.restore();
	}

	reset();

	return {
		reset,
		step,
		render,
		pressJump,
		get status() {
			return status;
		},
		get stats(): GameStats {
			return { carrots: collected.size, totalCarrots: carrots.length, time };
		}
	};
}
