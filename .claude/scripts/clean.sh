#!/bin/bash

# DOCS. Clean
# Clean build artifacts and dependencies

set -e

echo "🧹 Cleaning DOCS..."
echo ""

# Remove build artifacts
echo "🗑️  Removing dist/..."
rm -rf dist

# Remove Vite cache
echo "🗑️  Removing node_modules/.vite..."
rm -rf node_modules/.vite

# Remove TypeScript cache
echo "🗑️  Removing node_modules/.tmp..."
rm -rf node_modules/.tmp

echo ""
echo "✅ Clean complete!"
echo ""
echo "Install fresh dependencies: npm install"
echo "Build production: npm run build"
