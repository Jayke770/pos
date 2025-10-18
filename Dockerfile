FROM oven/bun AS build

WORKDIR /app
COPY *.json ./
COPY bun.lock bun.lock

RUN bun install

COPY ./api ./api

ENV NODE_ENV=production

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--outfile server \
	api/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/server server

ENV NODE_ENV production

CMD ["./server"]