# VM Visa Frontend - Optimized Build Dockerfile
FROM node:18-alpine

WORKDIR /app

# Set memory limit for node process
ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV PORT=3000

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps to resolve conflicts
RUN npm install --legacy-peer-deps --production=false

# Copy source code
COPY . .

# Build the frontend with memory optimization
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build:client

# Copy the simple server file
COPY server.js .

# Expose port
EXPOSE 3000

# Start command using our simple server
CMD ["node", "server.js"]