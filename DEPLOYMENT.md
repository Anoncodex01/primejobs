# Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy with Vercel CLI (Recommended)

1. **Install Vercel CLI globally**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? `Select your account`
   - Link to existing project? `N`
   - What's your project name? `axia-hr-advisory`
   - In which directory is your code located? `./` (current directory)
   - Want to override the settings? `N`

5. **Your site will be deployed!** 🎉

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit for Vercel deployment"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the Vite configuration

3. **Configure project settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy!** 🚀

## 🔧 Configuration Files

### vercel.json
This file is already configured with:
- Build command and output directory
- SPA routing (all routes redirect to index.html)
- Security headers
- Asset caching

### vite.config.ts
Optimized for production with:
- Code splitting
- Manual chunks for better caching
- Disabled source maps for smaller builds

## 🌍 Environment Variables

If you need environment variables, add them in the Vercel dashboard:

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add any required variables

Example:
```
VITE_API_URL=https://api.axiahr.com
VITE_APP_NAME=Axia HR Advisory
```

## 📊 Performance Optimization

The project is already optimized for Vercel with:

- **Code Splitting**: Vendor, router, and icon chunks
- **Asset Optimization**: Images and fonts optimized
- **Caching**: Static assets cached for 1 year
- **Security Headers**: XSS protection, content type options

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Automatic rollback on failed deployments

## 📱 Custom Domain

To add a custom domain:

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Domains
3. Add your domain (e.g., `axiahr.com`)
4. Update DNS records as instructed

## 🛠️ Troubleshooting

### Build Failures
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation passes locally

### Routing Issues
- The `vercel.json` includes SPA routing configuration
- All routes should work correctly

### Performance Issues
- Check the Vercel Analytics dashboard
- Monitor Core Web Vitals
- Optimize images and assets if needed

## 📞 Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Contact Vercel support if needed

---

**Your Axia HR Advisory website is now ready for production!** 🎉 