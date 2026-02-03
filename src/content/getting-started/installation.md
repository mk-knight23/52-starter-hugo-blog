---
title: Installation
description: Step-by-step guide to setting up DOCS. on your local machine.
date: 2026-01-29
category: Getting Started
author: DOCS. Team
---

# Installation

Get DOCS. running on your local machine in minutes.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 20.x or higher
- **npm** 10.x or higher
- **Git** for version control

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/52-starter-hugo-blog.git
cd 52-starter-hugo-blog
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required dependencies including:

- Vue 3 and Vue Router
- Vite and Vite-SSG
- Tailwind CSS v4
- Pinia state management
- TypeScript

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Verifying Installation

You should see:

- ✅ Documentation homepage loads
- ✅ Sidebar navigation works
- ✅ Dark mode toggle functions
- ✅ No console errors

## Troubleshooting

### Port Already in Use

If port 5173 is occupied:

```bash
npm run dev -- --port 3000
```

### Module Not Found

Clear the cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Run type check:

```bash
npm run type-check
```

## Next Steps

- [Explore Content Structure](/getting-started/quick-start)
- [Customize the Theme](/guides/customization)
- [Deploy to Production](/guides/deployment)
