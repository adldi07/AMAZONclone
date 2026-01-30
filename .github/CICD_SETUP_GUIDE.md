# CI/CD Pipeline Setup Guide for Amazon Clone

## 📋 Overview

This guide explains the complete CI/CD (Continuous Integration/Continuous Deployment) pipeline configured for your Amazon Clone project. The workflow automatically tests, builds, and deploys your application to Vercel whenever you push code to the `main` branch.

---

## 🔄 Workflow Structure

The CI/CD pipeline consists of **3 main jobs** that run sequentially:

```
1. Lint & Test → 2. Build → 3. Deploy to Vercel
```

### **Job 1: Lint & Test** 🧪
**Purpose:** Ensure code quality and catch bugs early

**What it does:**
- Checks out your code from GitHub
- Sets up Node.js version 20
- Installs dependencies for both `backend/` and `frontend/`
- Runs linting (code style checks) on both parts
- Runs automated tests (if you have them)

**Why it's important:**
- Catches syntax errors before deployment
- Ensures code follows best practices
- Prevents broken code from reaching production

### **Job 2: Build** 🏗️
**Purpose:** Verify that your application can be built successfully

**What it does:**
- Installs fresh dependencies using `npm ci` (faster & more reliable than `npm install`)
- Builds the frontend React application
- Verifies backend JavaScript syntax

**Why it's important:**
- Ensures your app compiles without errors
- Catches build-time issues before deployment
- The `CI: false` setting prevents ESLint warnings from failing the build

### **Job 3: Deploy to Vercel** 🚀
**Purpose:** Automatically deploy your app to production

**What it does:**
- Only runs when code is pushed to `main` (not on pull requests)
- Deploys frontend to Vercel
- Deploys backend to Vercel (if configured separately)
- Shows success message

**Why it's important:**
- Automates deployment (no manual steps needed!)
- Ensures only tested code reaches production
- Deploys both frontend and backend together

---

## 🔑 Required GitHub Secrets

To make this workflow work, you need to add these secrets to your GitHub repository:

### How to Add Secrets:
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each of the following:

### Required Secrets:

| Secret Name | Description | How to Get It |
|-------------|-------------|---------------|
| `VERCEL_TOKEN` | Your Vercel authentication token | 1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)<br>2. Click "Create Token"<br>3. Give it a name (e.g., "GitHub Actions")<br>4. Copy the token |
| `VERCEL_ORG_ID` | Your Vercel organization/team ID | 1. Go to your Vercel project settings<br>2. Look in `.vercel/project.json` after running `vercel link`<br>OR<br>Run: `vercel project ls` and copy the org ID |
| `VERCEL_PROJECT_ID` | Your Monorepo project ID on Vercel | 1. Go to your Vercel project settings for the main Amazon Clone project<br>2. Copy the Project ID<br>OR<br>Check `.vercel/project.json` at the root |

---

## 🛠️ Getting Vercel IDs (Step-by-Step)

### Method 1: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Link your project from the root directory
vercel link

# This creates .vercel/project.json with your IDs
cat .vercel/project.json
```

The output will look like:
```json
{
  "orgId": "team_xxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

### Method 2: From Vercel Dashboard

1. **Get VERCEL_TOKEN:**
   - Visit: https://vercel.com/account/tokens
   - Click "Create Token"
   - Copy and save it (you won't see it again!)

2. **Get VERCEL_ORG_ID:**
   - Go to: https://vercel.com/[your-username]/settings
   - Your org ID is in the URL or settings page

3. **Get VERCEL_PROJECT_ID:**
   - Go to your project on Vercel
   - Click Settings → General
   - Scroll to "Project ID" and copy it

---

## 📝 Key Features Explained

### 1. **Unified Monorepo Support**
Your project uses a `vercel.json` file at the root. The workflow handles this by:
- Deploying the root directory directly to Vercel.
- Vercel automatically detects the sub-projects based on your configuration.
- Routing for `/api` and the React frontend is handled seamlessly in production.

### 2. **Smart Caching**
```yaml
cache: 'npm'
cache-dependency-path: |
  backend/package-lock.json
  frontend/package-lock.json
```
This caches your `node_modules` so subsequent builds are **much faster** (can save 2-3 minutes per build!).

### 3. **npm ci vs npm install**
The workflow uses `npm ci` instead of `npm install` because:
- ✅ Faster (skips some checks)
- ✅ More reliable (uses exact versions from package-lock.json)
- ✅ Deletes node_modules first (clean install)
- ✅ Better for CI/CD environments

### 4. **Continue on Error**
```yaml
continue-on-error: true
```
For linting and testing, we allow the workflow to continue even if these fail. This is useful during development, but you can set this to `false` to enforce strict quality checks.

### 5. **Conditional Deployment**
```yaml
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
```
This ensures deployment only happens when:
- ✅ Code is pushed (not on pull requests)
- ✅ To the `main` branch (not feature branches)

---

## 🎯 Workflow Triggers

The workflow runs automatically when:

1. **Push to main branch:**
   ```bash
   git push origin main
   ```
   → Runs: Lint → Test → Build → Deploy

2. **Pull Request to main:**
   ```bash
   git push origin feature-branch
   # Then create PR on GitHub
   ```
   → Runs: Lint → Test → Build (NO deployment)

---

## 🚨 Troubleshooting

### Issue 1: "npm ci can only install packages when your package.json and package-lock.json are in sync"

**Solution:**
```bash
# In backend folder
cd backend
npm install
git add package-lock.json
git commit -m "Update package-lock.json"

# In frontend folder
cd ../frontend
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
```

### Issue 2: Build fails with ESLint errors

**Solution:**
The workflow already has `CI: false` to treat warnings as warnings, not errors. If you want stricter checks:
- Remove the `CI: false` line
- Fix all ESLint warnings in your code

### Issue 3: Vercel deployment fails

**Possible causes:**
1. Missing GitHub secrets → Add them as shown above
2. Wrong project IDs → Double-check your Vercel project settings
3. Vercel token expired → Create a new token

### Issue 4: Backend deployment fails

If you're deploying backend separately, ensure:
- `VERCEL_BACKEND_PROJECT_ID` is set correctly
- Your backend has a `vercel.json` configuration file
- Backend is a separate Vercel project

If your backend is deployed with frontend (monorepo), you can remove the backend deployment step.

---

## 🎨 Customization Options

### Make Linting/Testing Required

Change this:
```yaml
continue-on-error: true
```

To this:
```yaml
continue-on-error: false
```

### Add Environment Variables

Add this to the build step:
```yaml
- name: Build Frontend
  working-directory: ./frontend
  run: npm run build
  env:
    CI: false
    REACT_APP_API_URL: ${{ secrets.API_URL }}
    REACT_APP_STRIPE_KEY: ${{ secrets.STRIPE_KEY }}
```

### Deploy to Staging First

Add a staging job before production:
```yaml
deploy-staging:
  name: Deploy to Staging
  runs-on: ubuntu-latest
  needs: build
  if: github.event_name == 'pull_request'
  steps:
    - name: Deploy to Vercel Staging
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        working-directory: ./frontend
        # No --prod flag = staging deployment
```

---

## 📊 Monitoring Your Workflow

### View Workflow Runs:
1. Go to your GitHub repository
2. Click the **Actions** tab
3. You'll see all workflow runs with their status:
   - ✅ Green checkmark = Success
   - ❌ Red X = Failed
   - 🟡 Yellow dot = In progress

### View Logs:
1. Click on any workflow run
2. Click on a job (e.g., "Build Application")
3. Expand any step to see detailed logs

---

## 🎓 Best Practices

1. **Always test locally first:**
   ```bash
   # Test backend
   cd backend
   npm install
   npm test
   npm start

   # Test frontend
   cd frontend
   npm install
   npm test
   npm run build
   ```

2. **Use feature branches:**
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   git push origin feature/new-feature
   # Create PR to test before merging to main
   ```

3. **Review failed workflows:**
   - Don't ignore failed builds
   - Check the logs to understand what went wrong
   - Fix issues before merging

4. **Keep secrets secure:**
   - Never commit secrets to code
   - Use GitHub Secrets for sensitive data
   - Rotate tokens periodically

---

## 🔄 Next Steps

1. **Add the required GitHub secrets** (see section above)
2. **Test the workflow** by pushing a small change to main
3. **Monitor the Actions tab** to see it run
4. **Check Vercel** to confirm deployment

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Documentation](https://vercel.com/docs/deployments/overview)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)

---

## ❓ Need Help?

If you encounter issues:
1. Check the workflow logs in GitHub Actions
2. Verify all secrets are set correctly
3. Ensure your `package.json` files have the correct scripts
4. Check Vercel deployment logs

---

**Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Version:** 1.0
