// sw.js — Service Worker avec versioning automatique
// Le cache est invalidé automatiquement quand script.js ou style.css changent
// (network-first sur les assets principaux, cache-first sur les icônes)

const CACHE_NAME = "revision-it-v5";
const STATIC_ASSETS = [
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./manifest.json"
];

// Installation : on met en cache uniquement les assets statiques (icônes, manifest)
// Les fichiers JS/CSS/HTML sont gérés en network-first pour toujours avoir la dernière version
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activation : nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Stratégie selon le type de fichier :
// - HTML / JS / CSS → network-first (toujours la version la plus récente)
// - Icônes / manifest → cache-first (rarement modifiés)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isAppShell = [".html", ".js", ".css"].some(ext => url.pathname.endsWith(ext))
    || url.pathname.endsWith("/");

  if (isAppShell) {
    // Network-first : toujours essayer le réseau, fallback sur le cache
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then(r => r || caches.match("./index.html")))
    );
  } else {
    // Cache-first : icônes et manifest
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
  }
});
