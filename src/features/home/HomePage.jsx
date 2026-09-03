import Hero from './Hero'
import CategoryShowcase from './CategoryShowcase'
import ProductRail from './ProductRail'
import ProductTypeStrip from './ProductTypeStrip'
import CraftsmanshipBanner from './CraftsmanshipBanner'
import VideoSection from './VideoSection'
import HeritageBanner from './HeritageBanner'
import TrustBanner from './TrustBanner'
import {
  useBestSellers,
  useTrendingProducts,
  useNewArrivals,
  useFeaturedProducts,
} from '../../hooks/useProducts'

export default function HomePage() {
  const bestSellers = useBestSellers({ limit: 8 })
  const trending = useTrendingProducts({ limit: 8 })
  const newArrivals = useNewArrivals({ limit: 8 })
  const featured = useFeaturedProducts({ limit: 8 })

  return (
    <>
      <Hero />
      <CategoryShowcase />
      <ProductRail
        eyebrow="Customer Favourites"
        title="Best Sellers"
        subtitle="The pieces our shoppers can't stop wearing."
        products={bestSellers.data}
        isLoading={bestSellers.isLoading}
        isError={bestSellers.isError}
        refetch={bestSellers.refetch}
        viewAllHref="/shop?isBestSeller=true"
      />
      <ProductTypeStrip />
      <ProductRail
        eyebrow="Right Now"
        title="Trending"
        subtitle="Fresh styles catching everyone's eye this season."
        products={trending.data}
        isLoading={trending.isLoading}
        isError={trending.isError}
        refetch={trending.refetch}
        autoScroll
        viewAllHref="/shop?isTrending=true"
      />
      <CraftsmanshipBanner />
      <VideoSection />
      <ProductRail
        eyebrow="Just In"
        title="New Arrivals"
        subtitle="The newest additions to our collection."
        products={newArrivals.data}
        isLoading={newArrivals.isLoading}
        isError={newArrivals.isError}
        refetch={newArrivals.refetch}
        viewAllHref="/shop?isNewArrival=true"
        bgcolor="#faf7f1"
      />
      <ProductRail
        eyebrow="Curated For You"
        title="Featured Pieces"
        products={featured.data}
        isLoading={featured.isLoading}
        isError={featured.isError}
        refetch={featured.refetch}
        viewAllHref="/shop?isFeatured=true"
      />
      <HeritageBanner />
      <TrustBanner />
    </>
  )
}
