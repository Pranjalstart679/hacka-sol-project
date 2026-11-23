const cacheName = 'rakshya-cache-__CACHE_VERSION__';
const assets = __ASSETS__;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('rakshya-cache-') && key !== cacheName)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  const path = event.request.mode === 'navigate' ? '/index.html' : url.pathname;
  if (!assets.includes(path)) return;
  event.respondWith(caches.open(cacheName).then(async cache =>
    (await cache.match(path)) || fetch(event.request)
  ));
});
