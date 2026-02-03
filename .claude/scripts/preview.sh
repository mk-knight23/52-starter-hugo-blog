#!/bin/bash

# DOCS. Production Preview
# Preview production build locally

set -e

echo "👀 Previewing production build..."
echo ""

# Check if dist exists
if [ ! -d "dist" ]; then
  echo "❌ Build not found. Run 'npm run build' first."
  exit 1
fi

# Start preview server
npm run preview
