const CACHE_NAME = "empanadas-pwa-v1"
const basePath = location.pathname.includes("/empanadin") ? "/empanadin" : ""
const urlsToCache = [
  `${basePath}/`,
  `${basePath}/manifest.json`,
  `${basePath}/icon-192x192.png`,
  `${basePath}/icon-512x512.png`,
]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})

