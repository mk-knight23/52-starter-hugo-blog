# Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment Checks

### Content

- [ ] All content pages are complete
- [ ] All links work (no 404s)
- [ ] Images are optimized
- [ ] Frontmatter is complete on all pages
- [ ] No placeholder content remains

### SEO

- [ ] Meta descriptions are unique and compelling
- [ ] OpenGraph images are set (1200x630px)
- [ ] Sitemap includes all pages
- [ ] robots.txt is configured
- [ ] Canonical URLs are set
- [ ] Structured data is valid

### Performance

- [ ] Images are WebP/AVIF format
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Build size is reasonable (< 1MB initial)
- [ ] CSS is purged of unused styles
- [ ] Fonts are optimized (subset if needed)

### Testing

- [ ] Test on Chrome/Edge
- [ ] Test on Firefox
- [ ] Test on Safari (if available)
- [ ] Test on mobile browsers
- [ ] Test dark mode toggle
- [ ] Test search functionality
- [ ] Test all navigation links

## Build Process

### 1. Update Domain

Edit `scripts/generateSitemap.ts`:

```typescript
const DOMAIN = 'https://yourdomain.com'
```

### 2. Clean Build

```bash
npm run clean
npm install
```

### 3. Build

```bash
npm run build
```

Verify:
- [ ] Build completes without errors
- [ ] `dist/` folder is created
- [ ] `sitemap.xml` is generated
- [ ] `feed.xml` is generated
- [ ] `feed.json` is generated

### 4. Preview

```bash
npm run preview
```

Test at `http://localhost:4173`:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] All pages load
- [ ] No 404 errors
- [ ] Assets load correctly

## Platform-Specific

### GitHub Pages

[ ] Update `vite.config.ts` base path:
```typescript
base: '/repository-name/'
```

[ ] GitHub Actions workflow is configured

[ ] Push to main branch triggers deploy

[ ] Verify at `https://username.github.io/repo-name/`

### Netlify

[ ] Build command: `npm run build`

[ ] Publish directory: `dist`

[ ] Environment variables set (if needed)

[ ] Custom domain configured (if needed)

[ ] Redirects configured (if needed)

### Vercel

[ ] Build command: `npm run build`

[ ] Output directory: `dist`

[ ] Environment variables set

[ ] Custom domain configured

### Cloudflare Pages

[ ] Build command: `npm run build`

[ ] Build output directory: `dist`

[ ] Environment variables set

[ ] Custom domain configured

## Post-Deployment

### Verification

[ ] Site is accessible at domain
[ ] All pages load correctly
[ ] SSL certificate is valid
[ ] Redirects work (if configured)
[ ] sitemap.xml is accessible
[ ] feed.xml is accessible
[ ] robots.txt is accessible

### Monitoring

[ ] Set up analytics (Google Analytics, Umami, etc.)
[ ] Configure error tracking (Sentry, etc.)
[ ] Set up uptime monitoring
[ ] Test search engine indexing

### Performance

[ ] Run Lighthouse audit
[ ] Check Web Vitals (LCP, FID, CLS)
[ ] Verify caching headers
[ ] Test from different locations

## Rollback Plan

If issues occur:

1. **GitHub Pages**: Revert last commit
2. **Netlify**: Rollback to previous deploy
3. **Vercel**: Rollback in dashboard
4. **Cloudflare**: Rollback in dashboard

Keep a backup of the working version!
