# Use the official Bun image as base
FROM oven/bun:1 AS base

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and bun.lockb (if available)
COPY package.json bun.lockb* ./

# Install dependencies including devDependencies for build
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build stage
FROM base AS build

# Build the application (creates optimized binary)
RUN bun run build

# Production stage
FROM oven/bun:1 AS production

# Set working directory
WORKDIR /usr/src/app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 bunuser

# Copy the built application from build stage
COPY --from=build /usr/src/app/server ./server
COPY --from=build /usr/src/app/package.json ./package.json

# Change ownership of the app directory
RUN chown -R bunuser:nodejs /usr/src/app

# Switch to non-root user
USER bunuser

# Expose the port the app runs on
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun --version || exit 1

# Run the compiled binary
CMD ["./server"]