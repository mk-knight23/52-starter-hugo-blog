#!/bin/bash

# DOCS. Development Server
# Start development server with hot reload

set -e

echo "🚀 Starting DOCS. development server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Start dev server
npm run dev
