// Product/category imagery comes from backend-seeded URLs of varying
// reliability (some point at deprecated placeholder services). Swap any
// broken image for our own placeholder rather than showing a broken-image
// icon.
export function handleImageError(event) {
  event.currentTarget.src = '/placeholder-product.svg'
}

// Some seed products carry images from a defunct third-party placeholder
// service (source.unsplash.com) that no longer resolves at all. Use this to
// skip those when picking ONE hero-style image out of several candidates,
// rather than gambling on whichever product happens to rank first.
export function isKnownBrokenImageHost(url) {
  return typeof url === 'string' && url.includes('source.unsplash.com')
}

export function pickWorkingImage(products) {
  return (
    products.find((p) => p.images?.[0] && !isKnownBrokenImageHost(p.images[0]))?.images?.[0] ??
    products[0]?.images?.[0]
  )
}
