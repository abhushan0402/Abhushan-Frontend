import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
    mutations: {
      retry: 0,
    },
  },
})

export const queryKeys = {
  categories: ['categories'],
  category: (id) => ['categories', id],
  subCategoriesByCategory: (id) => ['categories', id, 'subcategories'],
  subCategories: ['subcategories'],
  productTypes: ['product-types'],
  products: (filters) => ['products', filters],
  bestSellers: (params) => ['products', 'best-sellers', params],
  featured: (params) => ['products', 'featured', params],
  trending: (params) => ['products', 'trending', params],
  newArrivals: (params) => ['products', 'new-arrivals', params],
  product: (id) => ['products', id],
  reviews: (productId, params) => ['reviews', productId, params],
  cart: ['cart'],
  wishlist: ['wishlist'],
  addresses: ['addresses'],
  me: ['me'],
  orders: (params) => ['orders', params],
  order: (id) => ['orders', id],
  notifications: (params) => ['notifications', params],
}
