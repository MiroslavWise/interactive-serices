const installEvent = () => {
    self.addEventListener("install", () => {
        console.log("service worker installed")
    })
}
installEvent()

const activateEvent = () => {
    self.addEventListener("activate", () => {
        console.log("service worker activated")
    })
}
activateEvent()

const cacheName = "v-11434"

const cacheClone = async (e) => {
    const res = await fetch(e.request)
    console.log("res: r", res)
    const resClone = res.clone()
    console.log("resClone: r", resClone)

    const cache = await caches.open(cacheName)
    console.log("cache: r", cache)
    await cache.put(e.request, resClone)
    return res
}

const fetchEvent = () => {
    self.addEventListener("fetch", (e) => {
        e.respondWith(
            cacheClone(e)
                .catch(() => caches.match(e.request))
                .then((res) => res),
        )
    })
}

fetchEvent()
