#!/usr/bin/env bash
set -euo pipefail

echo "[eas-build-pre-install] Node/Yarn 준비 시작"
node -v || true

# (1) 이미지에 선탑재된 Yarn 1.x가 PATH를 가로채는 경우가 있어 제거
echo "[eas-build-pre-install] Remove global yarn (if any)"
which yarn || true
yarn --version || true
sudo rm -f /usr/local/bin/yarn /usr/local/bin/yarnpkg || true

# (2) Corepack 최신화 및 활성화
echo "[eas-build-pre-install] Enable Corepack and activate yarn@4.9.1"
npm i -g corepack@latest
corepack enable
corepack prepare yarn@4.9.1 --activate

# (3) 셸 해시 초기화 후 버전 재확인
hash -r || true
which yarn || true
echo "[eas-build-pre-install] Yarn version after activation: $(yarn --version)"

# (4) Yarn 4에서 node_modules 링크 사용(Expo/EAS 기본과 호환)
yarn config set nodeLinker node-modules

echo "[eas-build-pre-install] 준비 완료"


