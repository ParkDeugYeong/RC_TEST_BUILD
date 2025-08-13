#!/usr/bin/env bash
set -euo pipefail

echo "[eas-build-pre-install] Enabling Corepack and preparing Yarn 4.9.1"
node -v || true
corepack --version || true

# Enable Corepack and activate the Yarn version required by package.json
corepack enable
corepack prepare yarn@4.9.1 --activate

echo "[eas-build-pre-install] Using Yarn version: $(yarn --version)"
echo "[eas-build-pre-install] Done"


