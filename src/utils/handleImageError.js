// Product/category imagery comes from backend-seeded URLs of varying
// reliability (some point at deprecated placeholder services). Swap any
// broken image for our own placeholder rather than showing a broken-image
// icon.
export function handleImageError(event) {
  event.currentTarget.src = '/placeholder-product.svg'
}
