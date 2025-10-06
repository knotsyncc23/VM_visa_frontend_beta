# 🚨 Frontend Deployment Troubleshooting Guide

## Problem Analysis

The deployment was failing because:

1. **Coolify was using Nixpacks instead of your Dockerfile**
2. **Build script was trying to build both client and server**
3. **Output directory mismatch** (`dist` vs `dist/spa`)

## ✅ Fixes Applied

### 1. Simplified Dockerfile
- Created minimal single-stage Dockerfile
- Uses `npx serve` to host static files
- Builds only client-side code

### 2. Package.json Updates
- Changed main `build` script to `build:client` only
- Updated `start` script to serve from `dist/spa`
- Added `serve` dependency

### 3. Nixpacks Configuration
- Added `nixpacks.toml` to force Dockerfile usage
- Set correct SPA output directory

### 4. Coolify Configuration
- Added `.coolify.yml` for deployment settings
- Added `.coolify/config.json` for build configuration

## 🔧 Configuration in Coolify Dashboard

### Build Settings
```
Build Command: npm run build:client
Start Command: npm start
Port: 3000
Health Check: /
```

### Environment Variables
Make sure these are set in Coolify:
```
NODE_ENV=production
PORT=3000
VITE_API_URL=https://your-backend-url.com/api
VITE_SOCKET_URL=https://your-backend-url.com
```

### Force Dockerfile Usage
If Coolify still uses Nixpacks, try:

1. **In Coolify Dashboard:**
   - Go to your application settings
   - Look for "Build Pack" or "Builder" settings
   - Select "Dockerfile" instead of "Nixpacks"

2. **Alternative: Rename Dockerfile**
   - Rename `Dockerfile.simple` to `Dockerfile`
   - This is an even simpler version

## 🚀 Next Deployment

The deployment should now:
1. ✅ Use your custom Dockerfile
2. ✅ Build only the client (SPA)
3. ✅ Serve static files on port 3000
4. ✅ Include proper health checks

## 🔍 If Still Failing

### Check These:
1. **Build logs** - Look for npm install/build errors
2. **Port configuration** - Ensure Coolify expects port 3000
3. **Environment variables** - Backend URL must be correct

### Alternative Approaches:

#### Option 1: Static Site (Recommended)
```dockerfile
FROM nginx:alpine
COPY dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Option 2: Use Coolify's Static Site feature
- Deploy as "Static Site" instead of "Application"
- Set build command: `npm run build:client`
- Set output directory: `dist/spa`

## 📞 Quick Test

After deployment, test:
```bash
# Health check
curl https://your-app-url.com/

# Check if files load
curl https://your-app-url.com/index.html
```

The deployment should now work! 🎉