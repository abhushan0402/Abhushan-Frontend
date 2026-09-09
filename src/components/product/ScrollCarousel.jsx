import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import HorizontalScroller from '../common/HorizontalScroller'
import ProductCard from './ProductCard'

const CARD_WIDTH = { xs: 250, sm: 300, md: 340 }

export default function ScrollCarousel({ products = [], autoScroll = false }) {
  if (!products.length) return null

  return (
    <HorizontalScroller snap autoScroll={autoScroll}>
      {products.map((product, i) => (
        <Box
          key={product._id}
          component={motion.div}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: (i % 4) * 0.08, ease: 'easeOut' }}
          sx={{
            flex: `0 0 ${CARD_WIDTH.xs}px`,
            width: { xs: CARD_WIDTH.xs, sm: CARD_WIDTH.sm, md: CARD_WIDTH.md },
            scrollSnapAlign: 'start',
          }}
        >
          <ProductCard product={product} />
        </Box>
      ))}
    </HorizontalScroller>
  )
}
