export const METAL_TYPES = [
  { value: 'gold', label: 'Gold' },
  { value: 'silver', label: 'Silver' },
  { value: '925-imported', label: '925 Imported' },
]

export const GENDERS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
  { value: 'gifting', label: 'Gifting' },
]

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'weight-asc', label: 'Weight: Low to High' },
  { value: 'weight-desc', label: 'Weight: High to Low' },
]

export const NAV_LINKS = [
  { label: 'Collection', to: '/shop' },
  {
    label: 'Jewellery',
    to: '/shop',
    megaMenu: true,
  },
  { label: 'Bridal', to: '/shop?search=bridal' },
  { label: 'Sale', to: '/shop?isBestSeller=true&sort=price-asc' },
  { label: 'Gifting', to: '/shop?gender=gifting' },
]

export const FOOTER_LINKS = {
  shop: [
    { label: 'Gold Jewellery', to: '/shop?metalType=gold' },
    { label: 'Silver Jewellery', to: '/shop?metalType=silver' },
    { label: '925 Imported', to: '/shop?metalType=925-imported' },
    { label: 'New Arrivals', to: '/shop?isNewArrival=true' },
  ],
  help: [
    { label: 'Contact Us', to: '/contact' },
    { label: 'About Us', to: '/about' },
    { label: 'Track Order', to: '/account/orders' },
    { label: 'Returns & Exchange', to: '/contact' },
  ],
  account: [
    { label: 'My Account', to: '/account/profile' },
    { label: 'My Orders', to: '/account/orders' },
    { label: 'Wishlist', to: '/wishlist' },
    { label: 'Address Book', to: '/account/addresses' },
  ],
}

export const TRUST_BADGES = [
  { title: 'BIS Hallmarked', desc: 'Certified purity on every piece' },
  { title: 'Free Insured Shipping', desc: 'Delivered safely, fully insured' },
  { title: 'Lifetime Exchange', desc: 'Exchange anytime at fair value' },
  { title: 'Handcrafted Artistry', desc: 'Hundreds of hours per creation' },
]

export const BRAND_NAME = 'Abhushan Vatika'
