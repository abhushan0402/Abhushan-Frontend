import { useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { useFeaturedProducts } from '../../hooks/useProducts'
import { handleImageError, pickWorkingImage } from '../../utils/handleImageError'
import SectionHeading from '../../components/common/SectionHeading'

// No real brand video exists yet — this uses a small, well-known public
// sample video (Google's public GTV sample bucket, ~2.5MB) purely as a
// placeholder so the section is genuinely functional rather than a broken
// <video> tag. Swap `VIDEO_SRC` for a real brand video whenever one exists.
// `preload="none"` + click-to-play (no autoplay) means the file is never
// fetched unless the visitor actually presses play.
const VIDEO_SRC = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'

export default function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const { data: products = [] } = useFeaturedProducts({ limit: 8 })
  const poster = pickWorkingImage(products)

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
            aspectRatio: '16 / 9',
            maxWidth: 960,
            mx: 'auto',
            bgcolor: '#0E5A55',
            overflow: 'hidden',
            borderRadius: '16px',
          }}
        >
          {playing ? (
            <Box
              component="video"
              src={VIDEO_SRC}
              controls
              autoPlay
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <>
              {poster ? (
                <Box
                  component="img"
                  src={poster}
                  alt=""
                  onError={handleImageError}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
                />
              ) : null}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton
                  onClick={() => setPlaying(true)}
                  aria-label="Play video"
                  sx={{
                    width: 76,
                    height: 76,
                    bgcolor: 'rgba(245,241,232,0.92)',
                    '&:hover': { bgcolor: '#fff' },
                  }}
                >
                  <PlayArrowRoundedIcon sx={{ fontSize: 40, color: '#0E5A55' }} />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'center', color: 'text.secondary', mt: 1.5 }}
        >
          Placeholder video — swap in a real brand film whenever one is ready.
        </Typography>
      </Box>
    </Box>
  )
}
