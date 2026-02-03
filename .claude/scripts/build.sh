#!/bin/bash

# DOCS. Production Build
# Build for production with all checks

set -e

echo "🔨 Building DOCS. for production..."
echo ""

# Type check
echo "🔍 Running TypeScript type check..."
npm run type-check || {
  echo "❌ TypeScript errors found!"
  exit 1
}

# Lint (if configured)
# npm run lint || {
#   echo "❌ Linting errors found!"
#   exit 1
# }

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Build
echo "📦 Building..."
npm run build || {
  echo "❌ Build failed!"
  exit 1
}

echo ""
echo "✅ Build successful!"
echo "📁 Output: dist/"
echo ""
echo "Preview with: npm run preview"
