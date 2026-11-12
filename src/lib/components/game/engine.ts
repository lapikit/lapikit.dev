export const tile = 32;

const level = [
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

const gravity = 2000;
const max_fall_speed = 900;
const move_speed = 230;
const ground_acceleration = 2400;
const air_acceleration = 1400;
const jump_velocity = 680;
const jump_cut_velocity = 300;
const coyote_time = 0.08;
const jump_buffer_time = 0.12;
const player_width = 22;
const player_height = 38;
const sprite_width = 30;
const sprite_height = 43;
const flag_height_in_tiles = 5;

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

const rows = level.length;
const cols = Math.max(...level.map((line) => line.length));
const grid = level.map((line) => [...line.padEnd(cols)]);

function findCells(char: string): Cell[] {
	return grid.flatMap((line, row) =>
		line.flatMap((value, col) => (value === char ? [{ col, row }] : []))
	);
}

const [spawn] = findCells('P');
const [flag] = findCells('F');
const carrots = findCells('C');

export const world_width = cols * tile;
export const world_height = rows * tile;

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
		w: player_width,
		h: player_height,
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
		player.x = spawn.col * tile + (tile - player_width) / 2;
		player.y = (spawn.row + 1) * tile - player_height;
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
		const top = Math.floor(player.y / tile);
		const bottom = Math.floor((player.y + player.h - 0.001) / tile);
		const col =
			dx > 0 ? Math.floor((player.x + player.w - 0.001) / tile) : Math.floor(player.x / tile);

		for (let row = top; row <= bottom; row++) {
			if (!isSolid(col, row)) continue;
			player.x = dx > 0 ? col * tile - player.w : (col + 1) * tile;
			player.vx = 0;
			return;
		}
	}

	function moveY(dy: number) {
		player.y += dy;
		player.onGround = false;
		const left = Math.floor(player.x / tile);
		const right = Math.floor((player.x + player.w - 0.001) / tile);
		const row =
			dy > 0 ? Math.floor((player.y + player.h - 0.001) / tile) : Math.floor(player.y / tile);

		for (let col = left; col <= right; col++) {
			if (!isSolid(col, row)) continue;
			if (dy > 0) {
				player.y = row * tile - player.h;
				player.onGround = true;
			} else {
				player.y = (row + 1) * tile;
			}
			player.vy = 0;
			return;
		}
	}

	function collectCarrots() {
		carrots.forEach(({ col, row }, index) => {
			if (collected.has(index)) return;
			const hitbox = { x: col * tile + 8, y: row * tile + 4, w: 16, h: 24 };
			if (overlaps(player, hitbox)) collected.add(index);
		});
	}

	function reachFlag() {
		const pole = {
			x: flag.col * tile + 12,
			y: (flag.row + 1 - flag_height_in_tiles) * tile,
			w: 8,
			h: flag_height_in_tiles * tile
		};
		if (overlaps(player, pole)) status = 'won';
	}

	function pressJump() {
		player.jumpBuffer = jump_buffer_time;
	}

	function step(dt: number, input: GameInput) {
		if (status === 'won') return;
		time += dt;

		const direction = Number(input.right) - Number(input.left);
		const acceleration = player.onGround ? ground_acceleration : air_acceleration;
		player.vx = approach(player.vx, direction * move_speed, acceleration * dt);
		if (direction) player.facing = direction;

		player.coyote = player.onGround ? coyote_time : Math.max(0, player.coyote - dt);
		player.jumpBuffer = Math.max(0, player.jumpBuffer - dt);

		if (player.jumpBuffer > 0 && player.coyote > 0) {
			player.vy = -jump_velocity;
			player.jumpBuffer = 0;
			player.coyote = 0;
		}

		if (!input.jump && player.vy < -jump_cut_velocity) player.vy = -jump_cut_velocity;
		player.vy = Math.min(player.vy + gravity * dt, max_fall_speed);

		moveX(player.vx * dt);
		moveY(player.vy * dt);

		if (player.y > world_height + tile * 2) respawn();

		collectCarrots();
		reachFlag();
	}

	function drawTile(ctx: CanvasRenderingContext2D, col: number, row: number, palette: Palette) {
		const x = col * tile;
		const y = row * tile;
		const value = grid[row][col];

		if (value === '#') {
			ctx.fillStyle = palette.ground;
			ctx.fillRect(x, y, tile, tile);
			if (!isSolid(col, row - 1)) {
				ctx.fillStyle = palette.groundTop;
				ctx.fillRect(x, y, tile, 6);
			}
		}

		if (value === 'B') {
			ctx.fillStyle = palette.blockEdge;
			ctx.fillRect(x, y, tile, tile);
			ctx.fillStyle = palette.block;
			ctx.fillRect(x + 3, y + 3, tile - 6, tile - 6);
			ctx.fillStyle = palette.blockEdge;
			ctx.fillRect(x + 12, y + 12, 8, 8);
		}
	}

	function drawCarrot(ctx: CanvasRenderingContext2D, { col, row }: Cell, palette: Palette) {
		const x = col * tile + tile / 2;
		const y = row * tile + 8 + Math.sin(time * 4 + col) * 2;

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
		const x = flag.col * tile + 14;
		const bottom = (flag.row + 1) * tile;
		const top = bottom - flag_height_in_tiles * tile;
		const flagY = status === 'won' ? top + 4 : bottom - tile * 1.5;

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
			ctx.drawImage(sprite, -sprite_width / 2, -sprite_height, sprite_width, sprite_height);
		}
		ctx.restore();
	}

	function render(ctx: CanvasRenderingContext2D, viewWidth: number, palette: Palette) {
		const cameraX =
			viewWidth >= world_width
				? (world_width - viewWidth) / 2
				: Math.min(Math.max(player.x + player.w / 2 - viewWidth / 2, 0), world_width - viewWidth);

		ctx.fillStyle = palette.sky;
		ctx.fillRect(0, 0, viewWidth, world_height);

		ctx.save();
		ctx.translate(-Math.round(cameraX), 0);

		const firstCol = Math.max(0, Math.floor(cameraX / tile));
		const lastCol = Math.min(cols - 1, Math.ceil((cameraX + viewWidth) / tile));
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
