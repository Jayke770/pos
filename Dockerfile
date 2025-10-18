# Use Bun's official image as base
FROM oven/bun:latest-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Production stage
FROM oven/bun:latest-alpine AS production

# Set working directory
WORKDIR /app

# Copy dependencies and source from base stage
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/api ./api
COPY --from=base /app/lib ./lib
COPY --from=base /app/types ./types
COPY --from=base /app/services ./services
COPY --from=base /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=base /app/tsconfig.json ./tsconfig.json
COPY --from=base /app/biome.json ./biome.json

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S apiuser -u 1001

# Change ownership of the app directory to the apiuser
RUN chown -R apiuser:nodejs /app
USER apiuser

# Set environment variables
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://127.0.0.1:4000/api/health || exit 1

# Start the API server
CMD ["bun", "run", "api"]