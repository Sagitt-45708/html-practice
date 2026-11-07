/* =========================================================
   HTML 学习笔记 · Service Worker
   让页面在手机上离线也能打开。改了页面内容后把 CACHE 版本号 +1。
   ========================================================= */

var CACHE = 'html-notes-v1';

var CORE = [
  './',
  './index.html',
  './project.html',
  './quotes.html',
  './tips.html',
  './machine.html',
  './contact.html',
  './styles.css',
  './nav.js',
  './machine.js',
  './manifest.webmanifest',
  './favicon.svg'
];

var MEDIA = [
  './cover.png',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(CORE).then(function () {
        return Promise.all(MEDIA.map(function (url) {
          return cache.add(url).catch(function () { /* 单张失败跳过 */ });
        }));
      });
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key !== CACHE;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then(function (cached) {
      var fresh = fetch(request).then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(CACHE).then(function (cache) { cache.put(request, copy); });
        }
        return response;
      }).catch(function () {
        return cached || caches.match('./index.html');
      });

      return cached || fresh;
    })
  );
});
