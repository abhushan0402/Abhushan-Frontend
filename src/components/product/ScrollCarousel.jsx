import { Box } from '@mui/material'
import HorizontalScroller from '../common/HorizontalScroller'
import ProductCard from './ProductCard'

const CARD_WIDTH = { xs: 250, sm: 300, md: 340 }

export default function ScrollCarousel({ products = [], autoScroll = false }) {
  if (!products.length) return null

  return (
    <HorizontalScroller snap autoScroll={autoScroll}>
      {products.map((product) => (
        <Box
          key={product._id}
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
