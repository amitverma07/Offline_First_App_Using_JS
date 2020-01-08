const cacheVersion = "v1";
const cacheAssets = [
  'index.html',
    'about.html',
    'contact.html',
    'staff.html',
    'main.js',
    'sw.js',
    'css/index.css',
    'css/about.css',
    'css/contact.css',
    'css/staff.css'
];

//Install Event
self.addEventListener("install", e => {
  e.waitUntil(
    caches
      .open(cacheVersion)
      .then(cache => {
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//Activate Event
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(cacheVersions => {
      return Promise.all(
        cacheVersions.map(cacheName => {
          if (cacheName !== cacheVersion) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//Fetch Event
self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});