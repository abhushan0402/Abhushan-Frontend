import { useRef, useState, useEffect } from 'react'
import { Box, IconButton } from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import ProductCard from './ProductCard'

const CARD_WIDTH = { xs: 190, sm: 230, md: 260 }

export default function ScrollCarousel({ products = [] }) {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    updateArrows()
  }, [products])

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  if (!products.length) return null

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        ref={trackRef}
        onScroll={updateArrows}
        sx={{
          display: 'flex',
          gap: { xs: 2, md: 3 },
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          pb: 1,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
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
      </Box>

      {canScrollLeft ? (
        <IconButton
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
            position: 'absolute',
            left: -20,
            top: '35%',
            bgcolor: '#fff',
            boxShadow: 2,
            '&:hover': { bgcolor: '#fff' },
          }}
        >
          <ChevronLeftRoundedIcon />
        </IconButton>
      ) : null}
      {canScrollRight ? (
        <IconButton
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
            position: 'absolute',
            right: -20,
            top: '35%',
            bgcolor: '#fff',
            boxShadow: 2,
            '&:hover': { bgcolor: '#fff' },
          }}
        >
          <ChevronRightRoundedIcon />
        </IconButton>
      ) : null}
    </Box>
  )
}
