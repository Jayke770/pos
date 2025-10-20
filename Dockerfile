# Use the official Bun image
FROM oven/bun:1 AS base

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and bun.lockb (if available)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the api folder and other necessary files
COPY backend/ ./backend/
COPY drizzle.config.ts ./

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 bunuser

# Change ownership of the app directory
RUN chown -R bunuser:nodejs /usr/src/app

# Switch to non-root user
USER bunuser

# Run the server:start command
CMD ["bun", "run", "server:start"]