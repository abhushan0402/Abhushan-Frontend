import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'
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
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: '#fff' }}>
      <Box className="av-container">
        <SectionHeading
          eyebrow="Behind the Craft"
          title="Watch Our Story"
          subtitle="A glimpse into the artistry behind every Abhushan Vatika piece."
        />
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          sx={{
            position: 'relative',
            aspectRatio: '9 / 16',
            maxWidth: { xs: '100%', sm: 520, md: 640 },
            mx: 'auto',
            bgcolor: '#2e0a3f',
            overflow: 'hidden',
            borderRadius: '20px',
            boxShadow: '0 24px 48px rgba(46,10,63,0.22)',
            border: '1px solid rgba(112,24,136,0.15)',
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
