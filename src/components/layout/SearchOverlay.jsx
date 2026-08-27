import { useState } from 'react'
import {
  Modal,
  Fade,
  Box,
  InputBase,
  IconButton,
  CircularProgress,
  Typography,
} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useUIStore } from '../../store/uiStore'
import { useDebounce } from '../../hooks/useDebounce'
import { useSearchSuggestions } from '../../hooks/useProducts'
import { formatPrice } from '../../utils/formatCurrency'
import { handleImageError } from '../../utils/handleImageError'

export default function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen)
  const close = useUIStore((s) => s.closeSearch)
  const navigate = useNavigate()
  const [term, setTerm] = useState('')
  const debouncedTerm = useDebounce(term, 300)

  const { data: suggestions = [], isLoading, isError, isFetching } = useSearchSuggestions(debouncedTerm)
  const showDropdown = term.trim().length > 1

  const handleClose = () => {
    close()
    setTerm('')
  }

  const goToResults = (value) => {
    const trimmed = value.trim()
    if (!trimmed) return
    navigate(`/shop?search=${encodeURIComponent(trimmed)}`)
    handleClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    goToResults(term)
  }

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(135deg, #9C4FB0 0%, #701888 55%, #2e0a3f 100%)',
            borderBottom: '1px solid rgba(112, 24, 136,0.3)',
            py: { xs: 3, md: 5 },
            maxHeight: '85vh',
            overflowY: 'auto',
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="av-container"
            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <SearchRoundedIcon sx={{ color: '#facc15' }} />
            <InputBase
              autoFocus
              fullWidth
              placeholder="Search for jewellery, gold rings, silver bangles..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              sx={{
                color: '#f5f1e8',
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                fontFamily: 'Lora, serif',
                '& input::placeholder': { color: 'rgba(245,241,232,0.4)', opacity: 1 },
              }}
            />
            {isFetching ? <CircularProgress size={20} sx={{ color: '#facc15' }} /> : null}
            <IconButton onClick={handleClose} sx={{ color: '#f5f1e8' }} aria-label="Close search">
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          {showDropdown ? (
            <Box className="av-container" sx={{ mt: 3 }}>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress size={24} sx={{ color: '#facc15' }} />
                </Box>
              ) : isError ? (
                <Typography sx={{ color: 'rgba(245,241,232,0.7)', textAlign: 'center', py: 3 }}>
                  Something went wrong while searching. Press Enter to try a full search.
                </Typography>
              ) : suggestions.length === 0 ? (
                <Typography sx={{ color: 'rgba(245,241,232,0.7)', textAlign: 'center', py: 3 }}>
                  No products found for "{term}".
                </Typography>
              ) : (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                    gap: 1.5,
                  }}
                >
                  {suggestions.map((item) => (
                    <Box
                      key={item._id}
                      component={RouterLink}
                      to={`/product/${item._id}`}
                      onClick={handleClose}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        border: '1px solid rgba(112, 24, 136,0.2)',
                        '&:hover': { borderColor: '#facc15' },
                      }}
                    >
                      <Box
                        component="img"
                        src={item.images?.[0] ?? '/placeholder-product.svg'}
                        alt={item.name}
                        onError={handleImageError}
                        sx={{ width: 48, height: 48, objectFit: 'cover', flexShrink: 0 }}
                      />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: '#f5f1e8', fontWeight: 500 }}
                          noWrap
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(245,241,232,0.6)' }}>
                          {formatPrice(item.basePrice)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
              {suggestions.length > 0 ? (
                <Typography
                  onClick={() => goToResults(term)}
                  sx={{
                    mt: 2.5,
                    color: '#facc15',
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  SEE ALL RESULTS FOR "{term.toUpperCase()}" →
                </Typography>
              ) : null}
            </Box>
          ) : null}
        </Box>
      </Fade>
    </Modal>
  )
}
