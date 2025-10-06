# VM Visa Frontend - Simple Build Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the frontend
RUN npm run build:client

# Install a simple HTTP server globally
RUN npm install -g http-server

# Expose port
EXPOSE 3000

# Start command using http-server
CMD ["http-server", "dist/spa", "-p", "3000", "-c-1"]