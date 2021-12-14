const cacheName = "circle-vs-squares-v6";
const appShellFiles = [
    "/",
    "/index.html",
    "/icon.png",
    "/bestscore.js",
    "/components.js",
    "/script.js",
    "/style.css"
];

self.addEventListener("install", function(e) {
    console.log("[Service Worker] Install");
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(appShellFiles);
    })());
});

self.addEventListener("fetch", function(e) {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) {return r;}
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});

self.addEventListener("activate", function(e) {
    e.waitUntil(caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
            if (key === cacheName) return;
            return caches.delete(key);
        }));
    }));
});
