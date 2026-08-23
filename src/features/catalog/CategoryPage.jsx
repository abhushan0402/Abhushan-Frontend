import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Chip, Stack, Skeleton } from '@mui/material'
import { useCategories, useSubCategoriesByCategory } from '../../hooks/useCategories'
import { useProducts } from '../../hooks/useProducts'
import ProductGrid from '../../components/product/ProductGrid'
import { ProductGridSkeleton } from '../../components/common/Skeletons'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import { handleImageError } from '../../utils/handleImageError'

export default function CategoryPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
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
      <Box
        sx={{
          position: 'relative',
          height: { xs: 220, md: 320 },
          bgcolor: '#0b0b0c',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={category.image}
          alt={category.name}
          onError={handleImageError}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: '#f5f1e8', fontSize: { xs: '2rem', md: '2.75rem' } }}
          >
            {category.name}
          </Typography>
          {category.description ? (
            <Typography sx={{ color: 'rgba(245,241,232,0.75)', mt: 1, maxWidth: 480 }}>
              {category.description}
            </Typography>
          ) : null}
        </Box>
      </Box>

      <Box className="av-container" sx={{ py: { xs: 4, md: 6 } }}>
        {subCategories.length > 0 ? (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, rowGap: 1 }}>
            {subCategories.map((sub) => (
              <Chip
                key={sub._id}
                label={sub.name}
                onClick={() =>
                  navigate(`/shop?categoryId=${category._id}&subCategoryId=${sub._id}`)
                }
                sx={{ borderRadius: 0 }}
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
