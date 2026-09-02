import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Box } from '@mui/material'

// Hover-to-zoom magnifier (the classic e-commerce PDP pattern): a lens box
// tracks the cursor over the source image, and an adjacent panel mirrors
// that region magnified via a scaled-up background-image. Touch devices
// have no hover to drive this, so the lens/panel simply never appear there
// (md-and-up only) — the plain image underneath still works everywhere.
//
// The rounded-corner image mask lives on an inner `overflow: hidden` layer
// rather than on this component's root — the zoom panel escapes past the
// image's right edge, so the root itself must stay `overflow: visible`.
//
// The panel is portaled to document.body and positioned `fixed` from real
// viewport coordinates rather than nested/absolute — nested with a z-index
// it only wins within its own local stacking context, so a later sibling
// (e.g. the product info column's buttons) would still paint on top of it
// regardless of that z-index. Portaling sidesteps the whole ancestor
// stacking-context question.
export default function ImageMagnifier({ src, alt, zoom = 2.5, onError, borderRadius = 0, sx, panelSx }) {
  const containerRef = useRef(null)
  const [lens, setLens] = useState(null)

  const updateLens = (e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const { width, height } = rect
    const lensWidth = width / zoom
    const lensHeight = height / zoom
    let x = e.clientX - rect.left - lensWidth / 2
    let y = e.clientY - rect.top - lensHeight / 2
    x = Math.max(0, Math.min(x, width - lensWidth))
    y = Math.max(0, Math.min(y, height - lensHeight))
    setLens({
      x,
      y,
      width: lensWidth,
      height: lensHeight,
      containerWidth: width,
      containerHeight: height,
      panelLeft: rect.right + 16,
      panelTop: rect.top,
    })
  }

  return (
    <Box
      ref={containerRef}
      onMouseMove={updateLens}
      onMouseEnter={updateLens}
      onMouseLeave={() => setLens(null)}
      sx={{ position: 'relative', width: '100%', height: '100%', ...sx }}
    >
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius }}>
        <Box
          component="img"
          src={src}
          alt={alt}
          onError={onError}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {lens ? (
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              left: lens.x,
              top: lens.y,
              width: lens.width,
              height: lens.height,
              border: '1px solid',
              borderColor: 'primary.main',
              bgcolor: 'rgba(112, 24, 136, 0.15)',
              pointerEvents: 'none',
            }}
          />
        ) : null}
      </Box>

      {lens
        ? createPortal(
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'fixed',
                left: lens.panelLeft,
                top: lens.panelTop,
                width: lens.containerWidth,
                height: lens.containerHeight,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '16px',
                overflow: 'hidden',
                bgcolor: '#fff',
                boxShadow: '0 8px 30px rgba(46,10,63,0.18)',
                zIndex: 1300,
                pointerEvents: 'none',
                backgroundImage: `url(${src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${lens.containerWidth * zoom}px ${lens.containerHeight * zoom}px`,
                backgroundPosition: `-${lens.x * zoom}px -${lens.y * zoom}px`,
                ...panelSx,
              }}
            />,
            document.body
          )
        : null}
    </Box>
  )
}
