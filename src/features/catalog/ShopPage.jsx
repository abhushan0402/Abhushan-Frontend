import { useState } from 'react'
import {
  Box,
  Grid2 as Grid,
  Typography,
  Select,
  MenuItem,
  InputBase,
  IconButton,
  Drawer,
  Button,
  Chip,
  Stack,
  Pagination,
} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useProducts } from '../../hooks/useProducts'
import ProductGrid from '../../components/product/ProductGrid'
import ProductFilters from '../../components/product/ProductFilters'
import { ProductGridSkeleton } from '../../components/common/PageSkeleton'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded'
import { SORT_OPTIONS } from '../../utils/constants'
import { useProductFilters } from './useProductFilters'

const FILTER_LABELS = {
  metalType: 'Metal',
  gender: 'Gender',
  productType: 'Type',
}

export default function ShopPage() {
  const { filters, setFilters, setPage, clearFilters } = useProductFilters()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(filters.search ?? '')

  const { data, isLoading, isError, refetch, isPlaceholderData } = useProducts(filters)
  const products = data?.products ?? []
  const pagination = data?.pagination ?? {}

  const activeChips = Object.entries(filters).filter(
    ([key, value]) =>
      ['metalType', 'gender', 'productType', 'search'].includes(key) && value
  )

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setFilters({ ...filters, search: searchInput || undefined })
  }

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '70vh' }}>
      <Box sx={{ bgcolor: '#faf7f1', py: { xs: 4, md: 6 } }}>
        <Box className="av-container">
          <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
            Shop All Jewellery
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1 }}>
            {pagination.total ?? 0} pieces, handcrafted with love.
          </Typography>
        </Box>
      </Box>

      <Box className="av-container" sx={{ py: { xs: 3, md: 5 } }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 0, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <ProductFilters filters={filters} onChange={setFilters} onClear={clearFilters} />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 2,
                mb: 3,
              }}
            >
              <Button
                startIcon={<TuneRoundedIcon />}
                onClick={() => setMobileFiltersOpen(true)}
                sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                variant="outlined"
                color="secondary"
                size="small"
              >
                Filters
              </Button>

              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  px: 1.5,
                  flex: { xs: '1 1 100%', sm: '0 1 280px' },
                }}
              >
                <InputBase
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  sx={{ flex: 1, fontSize: '0.875rem', py: 0.75 }}
                />
                <IconButton type="submit" size="small" aria-label="Search">
                  <SearchRoundedIcon fontSize="small" />
                </IconButton>
              </Box>

              <Box sx={{ flex: 1 }} />

              <Select
                value={filters.sort ?? 'newest'}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value }, { resetPage: false })}
                size="small"
                sx={{ minWidth: 180 }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {activeChips.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3, rowGap: 1 }}>
                {activeChips.map(([key, value]) => (
                  <Chip
                    key={key}
                    label={`${FILTER_LABELS[key] ?? key}: ${value}`}
                    onDelete={() => setFilters({ ...filters, [key]: undefined })}
                    size="small"
                  />
                ))}
              </Stack>
            ) : null}

            {isLoading ? (
              <ProductGridSkeleton count={9} />
            ) : isError ? (
              <ErrorState onRetry={refetch} />
            ) : products.length === 0 ? (
              <EmptyState
                icon={<SearchOffRoundedIcon fontSize="inherit" />}
                title="No products found"
                description="Try adjusting your filters or search terms."
                actionLabel="Clear Filters"
                onAction={clearFilters}
              />
            ) : (
              <Box sx={{ opacity: isPlaceholderData ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                <ProductGrid products={products} columns={{ xs: 6, sm: 4, md: 4 }} />
              </Box>
            )}

            {pagination.totalPages > 1 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.page ?? 1}
                  onChange={(_, page) => {
                    setPage(page)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  color="primary"
                  shape="rounded"
                />
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Box>

      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        slotProps={{ paper: { sx: { width: '85%', maxWidth: 340, p: 3 } } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <ProductFilters filters={filters} onChange={setFilters} onClear={clearFilters} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => setMobileFiltersOpen(false)}
        >
          Show Results
        </Button>
      </Drawer>
    </Box>
  )
}
