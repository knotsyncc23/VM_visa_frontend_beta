# VM Visa Frontend - Dockerfile
# Optimized for production deployment on Coolify

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Rebuild the source code only when needed  
FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

# Build the application
RUN npm run build

# Production image with nginx
FROM nginx:alpine AS runner

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S frontend -u 1001

# Set permissions
RUN chown -R frontend:nodejs /usr/share/nginx/html
RUN chown -R frontend:nodejs /var/cache/nginx
RUN chown -R frontend:nodejs /etc/nginx
RUN chown -R frontend:nodejs /var/log/nginx

# Switch to non-root user
USER frontend

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]