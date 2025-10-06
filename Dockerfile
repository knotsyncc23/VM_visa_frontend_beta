# VM Visa Frontend - Minimal Dockerfile for Coolify
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the frontend
RUN npm run build:client

# Expose port
EXPOSE 3000

# Start command using npx serve
CMD ["npx", "serve", "-s", "dist/spa", "-l", "3000"]