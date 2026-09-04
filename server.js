import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 10000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
};

const server = http.createServer((req, res) => {
  // Support high concurrency: Set Keep-Alive
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Keep-Alive', 'timeout=65, max=10000');

  // Strip query params
  const cleanUrl = req.url.split('?')[0];
  let filePath = path.join(DIST_DIR, cleanUrl === '/' ? 'index.html' : cleanUrl);

  // Fallback to index.html for client-side SPA routing
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // High Concurrency Caching Headers
  if (cleanUrl.startsWith('/assets/')) {
    // Immutable fingerprinted assets - cache for 1 year
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // HTML / root - cache for 1 hour with revalidation
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  }

  res.setHeader('Content-Type', contentType);
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Gzip compression for text-based assets
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const shouldCompress = /text|javascript|json|xml|svg/.test(contentType);

  if (shouldCompress && acceptEncoding.includes('gzip')) {
    res.setHeader('Content-Encoding', 'gzip');
    const rawStream = fs.createReadStream(filePath);
    const gzip = zlib.createGzip({ level: 6 });
    rawStream.pipe(gzip).pipe(res);
  } else {
    const rawStream = fs.createReadStream(filePath);
    rawStream.pipe(res);
  }
});

// Configure server limits for 1000+ concurrent connections
server.maxConnections = 25000;
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Nathdwara Jwellery High-Concurrency Production Server running on port ${PORT}`);
  console.log(`Ready to serve 1,000+ simultaneous visitors on Render`);
});
