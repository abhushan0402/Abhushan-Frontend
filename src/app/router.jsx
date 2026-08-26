/* eslint-disable react-refresh/only-export-components -- route config file, not a component module */
import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import RootLayout from '../components/layout/RootLayout'
import ProtectedRoute from '../components/common/ProtectedRoute'
import PageLoader from '../components/common/PageLoader'

const HomePage = lazy(() => import('../features/home/HomePage'))
const ShopPage = lazy(() => import('../features/catalog/ShopPage'))
const CategoryPage = lazy(() => import('../features/catalog/CategoryPage'))
const SubCategoryPage = lazy(() => import('../features/catalog/SubCategoryPage'))
const ProductDetailPage = lazy(() => import('../features/product/ProductDetailPage'))
const CartPage = lazy(() => import('../features/cart/CartPage'))
const WishlistPage = lazy(() => import('../features/wishlist/WishlistPage'))
const SignInPage = lazy(() => import('../features/auth/SignInPage'))
const SignUpPage = lazy(() => import('../features/auth/SignUpPage'))
const ForgotPasswordPage = lazy(() => import('../features/auth/ForgotPasswordPage'))
const AccountLayout = lazy(() => import('../features/account/AccountLayout'))
const ProfilePage = lazy(() => import('../features/account/ProfilePage'))
const AddressesPage = lazy(() => import('../features/account/AddressesPage'))
const OrdersPage = lazy(() => import('../features/account/OrdersPage'))
const OrderDetailPage = lazy(() => import('../features/account/OrderDetailPage'))
const CheckoutPage = lazy(() => import('../features/checkout/CheckoutPage'))
const AboutPage = lazy(() => import('../features/static/AboutPage'))
const ContactPage = lazy(() => import('../features/static/ContactPage'))
const NotFoundPage = lazy(() => import('../features/static/NotFoundPage'))

function withSuspense(element) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'shop', element: withSuspense(<ShopPage />) },
      { path: 'category/:slug', element: withSuspense(<CategoryPage />) },
      { path: 'subcategory/:slug', element: withSuspense(<SubCategoryPage />) },
      { path: 'product/:productId', element: withSuspense(<ProductDetailPage />) },
      { path: 'cart', element: withSuspense(<CartPage />) },
      { path: 'wishlist', element: withSuspense(<WishlistPage />) },
      { path: 'signin', element: withSuspense(<SignInPage />) },
      { path: 'signup', element: withSuspense(<SignUpPage />) },
      { path: 'forgot-password', element: withSuspense(<ForgotPasswordPage />) },
      {
        path: 'checkout',
        element: withSuspense(
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'account',
        element: withSuspense(
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <ProfilePage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'addresses', element: <AddressesPage /> },
          { path: 'orders', element: <OrdersPage /> },
          { path: 'orders/:orderId', element: <OrderDetailPage /> },
        ],
      },
      { path: 'about', element: withSuspense(<AboutPage />) },
      { path: 'contact', element: withSuspense(<ContactPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
])
