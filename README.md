# NeoTheme - Neo-Brutalist Blog Theme

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite-SSG](https://img.shields.io/badge/Vite--SSG-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A high-performance Neo-Brutalist editorial theme for Vue 3**

[Live Demo](https://neotheme.vercel.app) | [GitHub](https://github.com/mk-knight23/55-Hugo-Blog-Theme-Starter)

</div>

---

## Overview

NeoTheme is a production-grade Neo-Brutalist blog theme built with Vue 3, Vite-SSG, and Tailwind CSS. It features bold typography, high-contrast visuals, and a distinctive brutalist design language.

### Problem Statement

Traditional blog themes lack visual impact and personality. They blend into a sea of generic designs without standing out or making a statement.

### Solution

NeoTheme provides:
- **Bold Design**: Neo-Brutalist aesthetic with sharp edges and high contrast
- **Theme System**: Dark/Light mode with system detection and persistence
- **SSG Ready**: Pre-rendered pages with Vite-SSG
- **Type Safety**: Full TypeScript support

---

## Features Comparison

| Feature | Legacy Themes | NeoTheme (v2.0) |
| :--- | :--- | :--- |
| **Design** | Generic/Corporate | **Neo-Brutalist Bold** |
| **Theme** | Fixed | **Dark + Light with persistence** |
| **Architecture** | SPA only | **Vite-SSG Static Generation** |
| **Typography** | System fonts | **Space Grotesk + Inter** |
| **Accessibility** | Basic | **ARIA labels, keyboard nav** |
| **SEO** | Minimal | **@vueuse/head with full meta** |

---

## Tech Stack

- **Framework**: Vue 3.5+ (Script Setup)
- **SSG**: Vite-SSG for static generation
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide Vue
- **Head Management**: @vueuse/head
- **TypeScript**: 5.9+ strict mode

---

## Architecture

```
src/
├── App.vue              # Root with theme logic
├── main.ts              # Vite-SSG entry
├── router.ts            # Vue Router config
├── views/
│   ├── Home.vue         # Blog listing
│   └── Post.vue         # Single post
└── style.css            # Global brutalist styles
```

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/55-Hugo-Blog-Theme-Starter.git
cd 55-Hugo-Blog-Theme-Starter

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (SSG)
npm run build
```

---

## Theme System

NeoTheme includes a fully-featured dark/light mode with:

- **System Detection**: Auto-detects OS preference
- **Manual Toggle**: Brutalist toggle button in navbar
- **Persistence**: Preference saved in localStorage
- **Smooth Transitions**: 500ms CSS transitions

---

## Deployment

Compatible with any static hosting:

- **Vercel**: `npx vercel --prod`
- **Netlify**: Connect repository
- **GitHub Pages**: Deploy `dist/` folder

```bash
# Deploy to Vercel
npx vercel --prod --name neotheme
```

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with Vue 3 + Vite-SSG + Tailwind CSS**

</div>
