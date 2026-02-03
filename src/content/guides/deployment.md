---
title: Deployment
description: Deploy your DOCS. site to popular hosting platforms.
date: 2026-01-29
category: Guides
author: DOCS. Team
---

# Deployment Guide

Deploy your DOCS. site to production with ease.

## Pre-deployment Checklist

Before deploying, ensure:

- ✅ All content is written
- ✅ Links are working
- ✅ Meta tags are configured
- ✅ Build runs without errors
- ✅ Environment variables are set
- ✅ Analytics are configured (if needed)

## Build for Production

```bash
# Build static site
npm run build

# Preview production build
npm run preview
```

The `dist/` folder contains your static site.

## Deployment Platforms

### GitHub Pages

Free hosting for public repositories.

#### 1. Configure Base URL

Update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/repository-name/',
  plugins: [vue()]
})
```

#### 2. Deploy Workflow

The `.github/workflows/deploy.yml` is already configured:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
```

#### 3. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Push to main branch

Your site will be live at:
```
https://username.github.io/repository-name/
```

### Netlify

Automatic deployments from Git.

#### 1. Connect Repository

1. Connect your GitHub account
2. Select the repository
3. Configure build settings:

```
Build command: npm run build
Publish directory: dist
```

#### 2. Environment Variables

Add in Netlify dashboard:

```
NODE_VERSION: 20
```

#### 3. Deploy

Push to main branch - Netlify deploys automatically.

### Vercel

Zero-config deployment.

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Deploy

```bash
vercel
```

Follow the prompts to deploy.

#### 3. Custom Domain

Add in Vercel dashboard:
- Custom domain → Add domain
- Configure DNS records

### Cloudflare Pages

Global CDN with free SSL.

#### 1. Connect Repository

1. Connect Git account
2. Select repository
3. Configure:

```
Build command: npm run build
Build output directory: dist
```

#### 2. Deploy

Automatic on push to main.

## Environment Variables

### `.env` Files

Create `.env.production`:

```bash
VITE_SITE_URL=https://yourdomain.com
VITE_ANALYTICS_ID=GA-XXXXXXXXXX
```

### Access in Code

```typescript
const siteUrl = import.meta.env.VITE_SITE_URL
```

## Performance Optimization

### Before Deploying

```bash
# Check bundle size
npm run build

# Run Lighthouse audit
npx lighthouse http://localhost:4173 --view
```

### Optimization Tips

1. **Enable Compression**
   - Gzip/Brotli compression
   - Configure in hosting platform

2. **Cache Headers**
   ```yaml
   # netlify.toml
   [[headers]]
     for = "/*.js"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   ```

3. **CDN**
   - Use platform CDN
   - Serve from edge locations

4. **Images**
   - Optimize images before upload
   - Use WebP format

## Monitoring

### Analytics

Add analytics to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date())
  gtag('config', 'GA-XXXXXXXXXX')
</script>
```

### Uptime Monitoring

Use services like:
- UptimeRobot
- Pingdom
- StatusCake

## Troubleshooting

### Build Fails

Check logs for errors:
- TypeScript errors
- Missing dependencies
- Environment variables

### 404 Errors

Check:
- `base` in `vite.config.ts`
- Router configuration
- File paths

### Styling Missing

Ensure:
- `style.css` is imported
- Tailwind is configured
- CSS files are in `dist/`

## Next Steps

- [Customize Theme](/guides/customization)
- [Add Plugins](/guides/plugins)
- [Performance Tuning](/guides/performance)
