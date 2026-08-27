import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, Typography, Breadcrumbs } from '@mui/material'
import { useCategories, useSubCategories } from '../../hooks/useCategories'
import { useProducts } from '../../hooks/useProducts'
import ProductGrid from '../../components/product/ProductGrid'
import { ProductGridSkeleton, CategoryListingPageSkeleton } from '../../components/common/PageSkeleton'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'

export default function SubCategoryPage() {
  const { slug } = useParams()
  const { data: subCategories = [], isLoading: subCategoriesLoading } = useSubCategories()
  const subCategory = subCategories.find((s) => s.slug === slug)

  // `categoryId` on a subcategory is populated (a full category object) when
  // it comes from GET /api/subcategories, but only a bare id string when it
  // comes from GET /api/categories/:id/subcategories — handle both rather
  // than assuming one shape, falling back to the already-cached categories
  // list (shared with the Header/MegaMenu) instead of an extra network call.
  const { data: categories = [] } = useCategories()
  const rawCategoryRef = subCategory?.categoryId
  const parentCategory =
    rawCategoryRef && typeof rawCategoryRef === 'object'
      ? rawCategoryRef
      : categories.find((c) => c._id === rawCategoryRef)

  const {
    data,
    isLoading: productsLoading,
    isError,
    refetch,
  } = useProducts(subCategory ? { subCategoryId: subCategory._id, limit: 24 } : {})

  const products = data?.products ?? []

  if (subCategoriesLoading) {
    return <CategoryListingPageSkeleton />
  }

  if (!subCategory) {
    return (
      <EmptyState
        title="Collection not found"
        description="This collection may have moved or no longer exists."
        actionLabel="Browse All Jewellery"
        actionTo="/shop"
      />
    )
  }

  return (
    <Box sx={{ minHeight: '70vh' }}>
      <Box className="av-container" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 2, md: 3 }, textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}
        >
          {subCategory.name}
        </Typography>
        {subCategory.description ? (
          <Typography sx={{ color: 'text.secondary', mt: 1, maxWidth: 480, mx: 'auto' }}>
            {subCategory.description}
          </Typography>
        ) : null}
      </Box>

      <Box className="av-container" sx={{ pb: { xs: 4, md: 6 } }}>
        <Breadcrumbs sx={{ mb: 4, fontSize: '0.8rem' }}>
          <Typography
            component={RouterLink}
            to="/"
            variant="caption"
            sx={{ color: 'text.secondary', textDecoration: 'none' }}
          >
            Home
          </Typography>
          {parentCategory ? (
            <Typography
              component={RouterLink}
              to={`/category/${parentCategory.slug}`}
              variant="caption"
              sx={{ color: 'text.secondary', textDecoration: 'none' }}
            >
              {parentCategory.name}
            </Typography>
          ) : null}
          <Typography variant="caption" sx={{ color: 'text.primary' }}>
            {subCategory.name}
          </Typography>
        </Breadcrumbs>

        {productsLoading ? (
          <ProductGridSkeleton />
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : products.length === 0 ? (
          <EmptyState
            icon={<Inventory2OutlinedIcon fontSize="inherit" />}
            title="No products yet in this collection"
            description="Check back soon — new pieces are added regularly."
            actionLabel="Browse All Jewellery"
            actionTo="/shop"
          />
        ) : (
          <ProductGrid products={products} columns={{ xs: 6, sm: 4, md: 3 }} />
        )}
      </Box>
    </Box>
  )
}
