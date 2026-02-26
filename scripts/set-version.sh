#!/bin/sh
# Writes the current git hash into src/environments/version.ts
GIT_HASH="${GIT_HASH:-$(git rev-parse --short HEAD 2>/dev/null || echo 'dev')}"
cat > src/environments/version.ts << EOF
export const VERSION = {
  gitHash: '${GIT_HASH}',
};
EOF
echo "Version set to: $GIT_HASH"
