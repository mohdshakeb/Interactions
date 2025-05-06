#!/bin/bash

# Script to remove macOS hidden files from the project
# Enhanced version with more comprehensive file removal

# Check if running on macOS
if [[ "$OSTYPE" != *darwin* ]]; then
    echo "Not running on macOS, skipping..."
    exit 0
fi

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

# Find and remove all .fseventsd directories (common on external drives)
find . -name ".fseventsd" -type d -exec rm -rf {} \; 2>/dev/null || true

# Find and remove any other common macOS system files
find . -name ".TemporaryItems" -type d -exec rm -rf {} \; 2>/dev/null || true
find . -name ".apdisk" -type f -delete 2>/dev/null || true

# Create .metadata_never_index files if they don't exist in key directories
for dir in . src public; do
    if [ -d "$dir" ] && [ ! -f "$dir/.metadata_never_index" ]; then
        echo "# This empty file prevents macOS Spotlight from indexing this folder" > "$dir/.metadata_never_index"
        echo "# This helps reduce the creation of hidden system files" >> "$dir/.metadata_never_index"
        echo "Created .metadata_never_index in $dir"
    fi
done

# Ensure .com.apple.timemachine.donotpresent exists
if [ ! -f ".com.apple.timemachine.donotpresent" ]; then
    touch .com.apple.timemachine.donotpresent
    echo "Created .com.apple.timemachine.donotpresent to prevent TimeMachine usage"
fi

echo "Done! All macOS hidden files have been removed."
echo "Total files cleaned up: $(find . -name "._*" -o -name ".DS_Store" | wc -l | xargs)" 