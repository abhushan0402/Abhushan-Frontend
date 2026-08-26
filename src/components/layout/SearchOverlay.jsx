import { useState } from 'react'
import { Modal, Fade, Box, InputBase, IconButton } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useNavigate } from 'react-router-dom'
import { useUIStore } from '../../store/uiStore'

export default function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen)
  const close = useUIStore((s) => s.closeSearch)
  const navigate = useNavigate()
  const [term, setTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!term.trim()) return
    navigate(`/shop?search=${encodeURIComponent(term.trim())}`)
    close()
    setTerm('')
  }

  return (
    <Modal open={open} onClose={close} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(135deg, #121212 0%, #383838 55%, #232323 100%)',
            borderBottom: '1px solid rgba(31,128,117,0.3)',
            py: { xs: 3, md: 5 },
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="av-container"
            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <SearchRoundedIcon sx={{ color: '#1f8075' }} />
            <InputBase
              autoFocus
              fullWidth
              placeholder="Search for jewellery, gold rings, silver bangles..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              sx={{
                color: '#f5f1e8',
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                fontFamily: 'Playfair Display, serif',
                '& input::placeholder': { color: 'rgba(245,241,232,0.4)', opacity: 1 },
              }}
            />
            <IconButton onClick={close} sx={{ color: '#f5f1e8' }} aria-label="Close search">
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}
