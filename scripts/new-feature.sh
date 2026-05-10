#!/bin/bash

# Usage: ./scripts/new-feature.sh feature/branch-name
# Creates a new branch from up-to-date main

BRANCH=$1

if [ -z "$BRANCH" ]; then
  echo "Error: branch name required"
  echo "Usage: ./scripts/new-feature.sh feature/branch-name"
  exit 1
fi

git checkout main
git pull origin main
git checkout -b "$BRANCH"

echo ""
echo "Ready on branch: $BRANCH"
echo "Next: make changes, then git add <files> && git commit"
