# Use the official Bun image
FROM oven/bun:1 AS base

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and bun.lockb (if available)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the api folder and other necessary files
COPY api/ ./api/
COPY drizzle.config.ts ./

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 bunuser

# Change ownership of the app directory
RUN chown -R bunuser:nodejs /usr/src/app

# Switch to non-root user
USER bunuser

# Expose the port the app runs on (adjust if different)
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/ || exit 1

# Run the server:start command
CMD ["bun", "run", "server:start"]