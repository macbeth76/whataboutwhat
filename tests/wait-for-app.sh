#!/bin/sh
# Wait for the Angular dev server to be ready
echo "Waiting for app at $APP_URL ..."
until node -e "
  const http = require('http');
  const url = new URL('${APP_URL}');
  const req = http.get({ hostname: url.hostname, port: url.port, path: '/', headers: { Host: 'localhost' } }, (res) => {
    process.exit(res.statusCode < 400 ? 0 : 1);
  });
  req.on('error', () => process.exit(1));
  req.setTimeout(3000, () => { req.destroy(); process.exit(1); });
" 2>/dev/null; do
  sleep 2
done
echo "App is ready!"
exec "$@"
