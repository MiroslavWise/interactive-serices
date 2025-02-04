const CACHE_TTL = 15 * 60 * 1000
const cache = new Map()

self.addEventListener("message", async (e) => {
  cleanCache()
  const { url, options } = e.data

  const cachedItem = cache.get(url)
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_TTL) {
    self.postMessage({ status: "success", data: cachedItem.data })
    return
  }

  try {
    const response = await fetch(url, options)
    const data = await response.json()

    cache.set(url, {
      data,
      timestamp: Date.now(),
    })

    self.postMessage({ status: "success", data })
  } catch (error) {
    self.postMessage({ status: "error", error: error.message })
  }
})

function cleanCache() {
  const now = Date.now()
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      cache.delete(key)
    }
  }
}
