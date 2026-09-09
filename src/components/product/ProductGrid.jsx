import { Grid2 as Grid, Box } from '@mui/material'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function ProductGrid({ products = [], columns }) {
  const size = columns ?? { xs: 6, sm: 4, md: 3 }
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {products.map((product, i) => (
        <Grid key={product._id} size={size}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.08, ease: 'easeOut' }}
            sx={{ height: '100%' }}
          >
            <ProductCard product={product} />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
