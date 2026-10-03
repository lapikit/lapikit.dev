# ---------- STAGE 1: Build ----------
# full node image: sync-changelog needs git
FROM node:24 AS builder
WORKDIR /app

COPY --from=docker.io/oven/bun:1 /usr/local/bin/bun /usr/local/bin/bun

# deps layer stays cached until package.json or bun.lock changes
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . ./

# changes on every deploy so the build (and the changelog clone) never comes from cache
ARG BUILD_ID=local
RUN echo "build ${BUILD_ID}" && bun run build-srv

# ---------- STAGE 2: Runtime ----------
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/package.json ./package.json

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
	CMD wget -qO /dev/null http://127.0.0.1:3000/robots.txt || exit 1

CMD [ "node", "build" ]
