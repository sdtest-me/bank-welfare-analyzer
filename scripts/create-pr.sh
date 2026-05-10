#!/bin/bash

# Usage: ./scripts/create-pr.sh "PR title" "PR body"

TITLE=$1
BODY=$2

if [ -z "$TITLE" ]; then
  echo "Error: PR title required"
  echo "Usage: ./scripts/create-pr.sh \"PR title\" \"PR body\""
  exit 1
fi

git push origin HEAD

gh pr create \
  --title "$TITLE" \
  --body "${BODY:-No description provided.}"
