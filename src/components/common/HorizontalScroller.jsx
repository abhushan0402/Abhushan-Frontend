import { useRef, useState, useEffect, useCallback } from 'react'
import { Box, IconButton } from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

// Horizontally-scrolling row with click-to-scroll arrow buttons. The native
// scrollbar is hidden and relying on trackpad-swipe/shift-wheel alone isn't
// discoverable for most mouse users — the row reads as "frozen" without an
// obvious way to move it. The arrows are the actual scroll affordance.
// `autoScroll` optionally advances the row on an interval, pausing whenever
// the pointer is over it (or on focus, for keyboard users) and looping back
// to the start once it reaches the end; it's skipped entirely for
// prefers-reduced-motion.
export default function HorizontalScroller({
  children,
  gap = { xs: 2, md: 3 },
  snap = false,
  autoScroll = false,
  autoScrollIntervalMs = 3200,
}) {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [paused, setPaused] = useState(false)

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [children])

  const scrollBy = useCallback((dir) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!autoScroll || paused) return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollBy(1)
      }
    }, autoScrollIntervalMs)

    return () => clearInterval(timer)
  }, [autoScroll, paused, autoScrollIntervalMs, scrollBy])

  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Box
        ref={trackRef}
        onScroll={updateArrows}
        sx={{
          display: 'flex',
          gap,
          overflowX: 'auto',
          ...(snap ? { scrollSnapType: 'x mandatory' } : {}),
          pb: 1,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {children}
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
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 8px 20px rgba(33,29,23,0.15)',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            '&:hover': { bgcolor: 'primary.main', color: '#fff', transform: 'scale(1.08)' },
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
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 8px 20px rgba(33,29,23,0.15)',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            '&:hover': { bgcolor: 'primary.main', color: '#fff', transform: 'scale(1.08)' },
          }}
        >
          <ChevronRightRoundedIcon />
        </IconButton>
      ) : null}
    </Box>
  )
}
