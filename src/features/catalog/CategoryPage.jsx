import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, Typography, Chip, Stack, Skeleton } from '@mui/material'
import { useCategories, useSubCategoriesByCategory } from '../../hooks/useCategories'
import { useProducts } from '../../hooks/useProducts'
import ProductGrid from '../../components/product/ProductGrid'
import { ProductGridSkeleton } from '../../components/common/Skeletons'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'

export default function CategoryPage() {
  const { slug } = useParams()
  const { data: categories = [], isLoading: categoriesLoading } = useCategories()
  const category = categories.find((c) => c.slug === slug)

  const { data: subCategories = [] } = useSubCategoriesByCategory(category?._id)

  const {
    data,
    isLoading: productsLoading,
    isError,
    refetch,
  } = useProducts(category ? { categoryId: category._id, limit: 24 } : {})

  const products = data?.products ?? []

  if (categoriesLoading) {
    return (
      <Box className="av-container" sx={{ py: 6 }}>
        <Skeleton variant="text" width={280} sx={{ fontSize: '2rem', mb: 3 }} />
        <ProductGridSkeleton />
      </Box>
    )
  }

  if (!category) {
    return (
      <EmptyState
        title="Category not found"
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
          {category.name}
        </Typography>
        {category.description ? (
          <Typography sx={{ color: 'text.secondary', mt: 1, maxWidth: 480, mx: 'auto' }}>
            {category.description}
          </Typography>
        ) : null}
      </Box>

      <Box className="av-container" sx={{ pb: { xs: 4, md: 6 } }}>
        {subCategories.length > 0 ? (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, rowGap: 1 }}>
            {subCategories.map((sub) => (
              <Chip
                key={sub._id}
                component={RouterLink}
                to={`/subcategory/${sub.slug}`}
                label={sub.name}
                clickable
                variant="outlined"
              />
            ))}
          </Stack>
        ) : null}

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
