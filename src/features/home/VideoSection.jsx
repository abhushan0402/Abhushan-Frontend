import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import SectionHeading from '../../components/common/SectionHeading'

export default function VideoSection() {
  const videoRef = useRef(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: '#faf7f1' }}>
      <Box className="av-container">
        <SectionHeading
          eyebrow="Behind the Craft"
          title="Watch Our Story"
          subtitle="A glimpse into the artistry behind every Abhushan Vatika piece."
        />
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '9 / 16',
            maxWidth: 420,
            mx: 'auto',
            bgcolor: '#2e0a3f',
            overflow: 'hidden',
            borderRadius: '16px',
          }}
        >
          <Box
            ref={videoRef}
            component="video"
            src="/Video.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Box>
    </Box>
  )
}
