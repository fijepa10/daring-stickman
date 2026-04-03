const CACHE_NAME = 'ragdoll-v8';
const ASSETS = ['./manifest.json', './icon-192.png', './icon-512.png',
  './bounce.mp3', './death1.mp3', './death2.mp3', './death3.mp3',
  './wind.mp3', './ding.mp3', './boing.mp3', './upgrade.mp3', './music.mp3',
  './Gothica-Bold.ttf', './Gothica-Book.ttf'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Network-first for HTML and API calls
  if (e.request.mode === 'navigate' || url.pathname === '/' ||
      url.pathname === '/index.html' || url.pathname.startsWith('/api/')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // Cache-first for static assets
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
