const cacheName = 'v1'; //version name

const cacheAssests = [   //variable of assests contains array of all pages
  'index.html',
  'about.html',
  'contact.html',
  'staff.html',
  'main.js',
  '/css/index.css',
  '/css/about.css',
  '/css/contact.css',
  '/css/staff.css',
  '/normalize/normalize.css'
];

//Call install event
self.addEventListener('install', e => {
  console.log("hi john");
  e.waitUntil( //telling the browser to wait until promise is finised 
    caches //caches storage api
      .open(cacheName) //it uses variable cacheName defined above
      .then(cache => {
        cache.addAll(cacheAssests);
      })
      .then(() => self.skipWaiting())
  );
});

//Call activate event
self.addEventListener('activate', e => {
  console.log("activated");
  //remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheName => {
      return Promise.all(
        cacheName.map(cache => {
          if (cache !== cacheName) {
            console.log("delete old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//call fetch event
self.addEventListener('fetch', e => {
  console.log("fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});