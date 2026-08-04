/**
 * Put the browser directives back on cached pages.
 *
 * routeRules asks for `public, max-age=0, must-revalidate, s-maxage=…, stale-while-revalidate=600`,
 * but any route that also sets `swr` never sends that: Nitro's cache layer writes its own
 * `s-maxage=…, stale-while-revalidate` afterwards and the browser half is lost.
 *
 * A response with no max-age and a Last-Modified is the one case where browsers fall back to
 * heuristic freshness — roughly a tenth of the document's age — so each device caches the page for
 * a different length of time depending on when it happened to fetch it. That is why a stopped
 * offer kept showing on some laptops and phones and not others, and why only a hard refresh
 * cleared it.
 *
 * `beforeResponse` runs after the cache layer, so what it sets is what actually goes out. The CDN
 * directives are left exactly as they were — only the browser is told to revalidate.
 */
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('beforeResponse', (event) => {
    const cc = getResponseHeader(event, 'cache-control')
    if (typeof cc !== 'string' || !cc.includes('s-maxage')) return
    // Already correct (or deliberately immutable, like hashed assets) — leave it alone.
    if (/(^|[\s,])(max-age|no-store|immutable)/.test(cc)) return

    setResponseHeader(event, 'cache-control', `public, max-age=0, must-revalidate, ${cc}`)
  })
})
