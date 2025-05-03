#!/bin/bash

# Script to remove macOS hidden files from the project

echo "Removing macOS hidden files from the project..."

# Find and remove all ._* files
find . -name "._*" -type f -delete

# Find and remove all .DS_Store files
find . -name ".DS_Store" -type f -delete

# Find and remove all .AppleDouble directories
find . -name ".AppleDouble" -type d -exec rm -rf {} \; 2>/dev/null || true

# Find and remove all .Spotlight-V100 directories
find . -name ".Spotlight-V100" -type d -exec rm -rf {} \; 2>/dev/null || true

# Find and remove all .Trashes directories
find . -name ".Trashes" -type d -exec rm -rf {} \; 2>/dev/null || true

echo "Done! All macOS hidden files have been removed." 