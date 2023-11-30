const SCSS = []

const SVG = [
    "/icons/fill/apple.svg",
    "/icons/fill/face.svg",
    "/icons/fill/google.svg",
    "/icons/fill/icon.svg",
    "/icons/fill/telegram.svg",
    "/icons/fill/trash.svg",
    "/icons/fill/vk.svg",
    "/icons/fill/yandex.svg",
    "/icons/fill/youtube.svg",
    "/icons/mobile/regular/blog-regular.svg",
    "/icons/mobile/regular/map-regular.svg",
    "/icons/mobile/regular/message-regular.svg",
    "/icons/mobile/regular/profile-active-regular.svg",
    "/icons/mobile/regular/profile-no-auth-regular.svg",
    "/icons/mobile/regular/sharing-regular.svg",
    "/icons/mobile/fill/bell-fill.svg",
    "/icons/mobile/fill/blog-filled.svg",
    "/icons/mobile/fill/map-filled.svg",
    "/icons/mobile/fill/message-filled.svg",
    "/icons/mobile/fill/profile-active-filled.svg",
    "/icons/mobile/fill/profile-no-auth-filled.svg",
    "/icons/mobile/fill/sharing-filled.svg",
    "/icons/mobile/Polygon.svg",
    "/icons/fill/disabled/apple.svg",
    "/icons/fill/disabled/google.svg",
    "/icons/fill/disabled/telegram.svg",
    "/logo/wordmark.svg",
    "/svg/arrow-down.svg",
    "/svg/arrow-left.svg",
    "/svg/x-close.svg",
    "/svg/x-close-white.svg",
    "/svg/x-close-primary.svg",
    "/svg/x-circle-primary.svg",
    "/svg/verified-tick.svg",
    "/svg/verification.svg",
    "/svg/users-03.svg",
    "/svg/trash-black.svg",
    "/svg/edit.svg",
    "/svg/stars/star-fill.svg",
    "/svg/stars/star-outline.svg",
    "/svg/arrow-right.svg",
    "/svg/geo-marker.svg",
    "/svg/log-out.svg",
    "/svg/loading-03.svg",
    "/svg/eye-off.svg",
    "/svg/eye.svg",
    "/svg/sliders-01.svg",
    "/svg/calendar.svg",
    "/svg/category/default.svg",
]

const PNG = [
    "/icons/mobile/Polygon.png",
    "/logo/main-logo-png.png",
    "/map/circle-alert.png",
    "/map/circle-discussion.png",
    "/map/circle-offers-default.png",
    "/map/default-alert-hover.png",
    "/map/default-alert.png",
    "/map/default-discussion-hover.png",
    "/map/default-discussion.png",
    "/map/deffault-offers.png",
    "/map/not.png",
    "/png/welcome/four.png",
    "/png/welcome/girl-def.png",
    "/png/welcome/girl-fest.png",
    "/png/welcome/one.png",
    "/png/welcome/three.png",
    "/png/welcome/two.png",
]

const installEvent = () => {
    self.addEventListener("install", (event) => {
        async function onInstall() {
            return caches.open("static").then((cache) => cache.addAll([...SVG, ...PNG, ...SCSS, "/scripts/masonry.pkgd.min.js"]))
        }

        event.waitUntil(onInstall(event))
    })
}
installEvent()

const activateEvent = () => {
    self.addEventListener("activate", () => {
        console.log("service worker activated")
    })
}
activateEvent()

// const cacheName = "v-27-11-2023"

// self.addEventListener("fetch", (event) => {
//     if (event.request.mode === "navigate") {
//         event.respondWith(
//             (async function () {
//                 const normalizedUrl = new URL(event.request.url)
//                 normalizedUrl.search = ""

//                 const fetchResponseP = fetch(normalizedUrl)
//                 const fetchResponseCloneP = fetchResponseP.then((r) =>
//                     r.clone(),
//                 )

//                 event.waitUntil(
//                     (async function () {
//                         const cache = await caches.open(cacheName)
//                         await cache.put(
//                             normalizedUrl,
//                             await fetchResponseCloneP,
//                         )
//                     })(),
//                 )

//                 return (await caches.match(normalizedUrl)) || fetchResponseP
//             })(),
//         )
//     }
// })
