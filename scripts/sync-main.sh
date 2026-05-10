#!/bin/bash

# Usage: ./scripts/sync-main.sh
# Syncs local main with origin and prunes stale remote branches

git checkout main
git pull --rebase origin main
git fetch origin --prune

echo ""
echo "main is up to date with origin/main"
echo "Stale remote branches pruned"
