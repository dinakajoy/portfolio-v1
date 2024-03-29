const cacheName = 'V2';

self.addEventListener('install', e => {
    console.log();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', e => {
    if(!(e.request.method === "POST")) {
        e.respondWith(
            fetch(e.request)
            .then(res => {
                const resClone = res.clone();
                caches
                .open(cacheName)
                .then(cache => {
                    cache.put(e.request, resClone);
                });
                return res;
            })
            .catch(err => caches.match(e.request)
            .then(res => res))
        );
    }
});