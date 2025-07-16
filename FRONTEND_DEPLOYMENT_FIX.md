# Frontend Deployment Fix Guide

## 🚨 **Current Issue: 404 NOT_FOUND on Vercel**

Your frontend is showing a 404 error because Vercel needs proper configuration for React/Vite apps.

## ✅ **Solution Steps**

### Step 1: Fix Vercel Configuration
I've created a `vercel.json` file with the correct settings:

```json
{
  "buildCommand": "npm run build:client",
  "outputDirectory": "dist/spa",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/((?!api/.*).*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 2: Update Environment Variables

#### In Vercel Dashboard:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add this variable:
```
VITE_API_URL = https://your-backend-name.onrender.com/api
```

#### Replace with your actual backend URL:
- First deploy your backend to Render
- Get the URL (e.g., `https://vm-visa-backend-abc123.onrender.com`)
- Update the environment variable

### Step 3: Redeploy on Vercel

#### Option A: Automatic Redeploy
1. Push your changes to GitHub:
```bash
git add .
git commit -m "Fix Vercel configuration and environment variables"
git push origin main
```
2. Vercel will automatically redeploy

#### Option B: Manual Redeploy
1. Go to your Vercel dashboard
2. Click on your project
3. Click "Redeploy" button

### Step 4: Verify Deployment

After redeployment, check:
1. **Frontend loads**: `https://vm-visa-test.vercel.app`
2. **React router works**: Navigate to different pages
3. **API connection**: Check browser console for API errors

## 🔧 **Alternative: Deploy to Netlify Instead**

If Vercel continues to have issues, you can deploy to Netlify (your app is already configured for it):

### Netlify Deployment:
1. Go to [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Set build settings:
   - **Build command**: `npm run build:client`
   - **Publish directory**: `dist/spa`
4. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-name.onrender.com/api`

## 📋 **Deployment Checklist**

- [ ] Backend deployed and running on Render
- [ ] Backend health check working: `/api/health`
- [ ] Frontend environment variables updated
- [ ] Correct build command set
- [ ] Output directory configured
- [ ] Rewrite rules for React Router

## 🔗 **Correct URLs After Fix**

- **Frontend**: `https://vm-visa-test.vercel.app` (should load properly)
- **Backend**: `https://your-backend-name.onrender.com/api`
- **Health Check**: `https://your-backend-name.onrender.com/api/health`

## 🚨 **Common Issues & Solutions**

### Frontend still shows 404
- Check `vercel.json` is in root directory
- Verify build command in Vercel settings
- Check output directory is `dist/spa`

### Frontend loads but API calls fail
- Verify `VITE_API_URL` environment variable
- Check backend is deployed and running
- Verify CORS settings in backend

### Build fails on Vercel
- Check `package.json` scripts
- Verify all dependencies are installed
- Check build logs for specific errors

## 📞 **Need Help?**

If issues persist:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify backend health endpoint
4. Test API calls directly
