# 🚀 Deployment Checklist

Use this checklist to ensure your CI/CD pipeline is properly configured.

## ✅ Pre-Deployment Setup

### 1. GitHub Secrets Configuration
- [ ] `VERCEL_TOKEN` - Created and added to GitHub Secrets
- [ ] `VERCEL_ORG_ID` - Added to GitHub Secrets
- [ ] `VERCEL_PROJECT_ID` - Added to GitHub Secrets (Frontend)
- [ ] `VERCEL_BACKEND_PROJECT_ID` - Added to GitHub Secrets (Backend, if separate)

### 2. Vercel Project Setup
- [ ] Frontend project created on Vercel
- [ ] Backend project created on Vercel (if deploying separately)
- [ ] Environment variables configured in Vercel dashboard
- [ ] Database connection string added to Vercel

### 3. Local Testing
- [ ] Backend runs locally without errors (`npm start` in backend/)
- [ ] Frontend builds successfully (`npm run build` in frontend/)
- [ ] All tests pass (`npm test` in both folders)
- [ ] No critical ESLint errors

### 4. Repository Configuration
- [ ] Workflow file exists at `.github/workflows`
- [ ] `package-lock.json` exists in both backend/ and frontend/
- [ ] `.gitignore` properly configured
- [ ] All changes committed and pushed

## 🔍 Quick Verification Commands

Run these locally before pushing:

```bash
# Check backend
cd backend
npm install
npm test
npm start

# Check frontend
cd ../frontend
npm install
npm test
npm run build
```

## 📋 First-Time Deployment Steps

1. **Get Vercel Token:**
   - Visit: https://vercel.com/account/tokens
   - Create new token
   - Copy and save it

2. **Get Project IDs:**
   ```bash
   cd frontend
   vercel link
   cat .vercel/project.json
   ```

3. **Add Secrets to GitHub:**
   - Go to: Repository → Settings → Secrets and variables → Actions
   - Add all 4 secrets

4. **Push to Main:**
   ```bash
   git add .
   git commit -m "Setup CI/CD pipeline"
   git push origin main
   ```

5. **Monitor Deployment:**
   - Go to: Repository → Actions tab
   - Watch the workflow run
   - Check for green checkmarks ✅

## 🚨 Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| "npm ci" fails | Run `npm install` locally and commit `package-lock.json` |
| Build fails with ESLint | Check logs, fix errors, or set `CI: false` |
| Vercel deployment fails | Verify secrets are correct |
| Backend deployment fails | Check if backend needs separate Vercel project |

## 🎯 Post-Deployment Verification

- [ ] Visit your Vercel frontend URL - site loads correctly
- [ ] Check backend API endpoints - returning expected data
- [ ] Test user authentication - login/signup works
- [ ] Verify database connection - data persists
- [ ] Check browser console - no critical errors

## 📊 Monitoring

After each deployment:
1. Check GitHub Actions for workflow status
2. Check Vercel dashboard for deployment logs
3. Test critical user flows on production
4. Monitor error tracking (if configured)

---

**Last Updated:** 2026-01-31
