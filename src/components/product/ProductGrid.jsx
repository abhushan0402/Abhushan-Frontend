import { Grid2 as Grid } from '@mui/material'
import ProductCard from './ProductCard'

export default function ProductGrid({ products = [], columns }) {
  const size = columns ?? { xs: 6, sm: 4, md: 3 }
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {products.map((product) => (
        <Grid key={product._id} size={size}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
