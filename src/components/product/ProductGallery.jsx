import { useState } from 'react'
import { Box } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import ImageMagnifier from '../common/ImageMagnifier'

export default function ProductGallery({ images = [], name }) {
  const [active, setActive] = useState(0)
  const list = images.length ? images : ['/placeholder-product.svg']

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'column' },
          gap: 1.25,
          overflowX: { xs: 'auto', sm: 'visible' },
        }}
      >
        {list.map((img, i) => (
          <Box
            key={img + i}
            onClick={() => setActive(i)}
            sx={{
              width: { xs: 60, sm: 72 },
              height: { xs: 60, sm: 72 },
              flexShrink: 0,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: active === i ? 'primary.main' : 'divider',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={img}
              alt={`${name} thumbnail ${i + 1}`}
              onError={(e) => {
                e.currentTarget.src = '/placeholder-product.svg'
              }}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          flex: 1,
          aspectRatio: '1 / 1',
          bgcolor: '#f1ebe0',
          borderRadius: '16px',
          position: 'relative',
        }}
      >
        <AnimatePresence mode="wait">
          <Box
            key={active}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            sx={{ position: 'absolute', inset: 0 }}
          >
            <ImageMagnifier
              src={list[active]}
              alt={name}
              borderRadius="16px"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-product.svg'
              }}
            />
          </Box>
        </AnimatePresence>
      </Box>
    </Box>
  )
}
