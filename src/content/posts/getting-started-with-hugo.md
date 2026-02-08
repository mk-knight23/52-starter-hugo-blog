---
title: Getting Started with Hugo
subtitle: A modern static site generator
date: 2024-01-15
draft: false
tags: [hugo, static-site, web-development]
---

# Getting Started with Hugo

Hugo is a modern static site generator written in Go. It's incredibly fast, flexible, and perfect for building blogs, documentation, and personal websites.

## Why Choose Hugo?

- **Blazing Fast**: Build sites in milliseconds, not minutes
- **Flexible**: Supports custom themes and layouts
- **Easy to Use**: Simple syntax and straightforward configuration
- **Active Community**: Large community and extensive documentation

## Installation

```bash
# Install Hugo
brew install hugo

# Verify installation
hugo version
```

## Creating a New Site

```bash
# Create a new Hugo site
hugo new site my-blog

# Navigate to your site
cd my-blog

# Add a theme
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke

# Create your first post
hugo new posts/my-first-post.md
```

Happy Hugo-ing!