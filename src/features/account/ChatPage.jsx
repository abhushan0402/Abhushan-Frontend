import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import EmptyState from '../../components/common/EmptyState'

// No live-chat backend/integration exists yet — this is a real UI entry
// point (reachable from My Account) rather than a fabricated chat widget.
// Wire a real provider (e.g. Intercom/Zendesk/a custom socket) or a
// `/api/chat` endpoint here once one exists.
export default function ChatPage() {
  return (
    <Box>
      <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem', mb: 3 }}>
        Chat with Us
      </Typography>
      <EmptyState
        icon={<ChatBubbleOutlineRoundedIcon fontSize="inherit" />}
        title="Live chat is coming soon"
        description="We're not live-chat enabled just yet. For now, reach our support team directly and we'll get back to you."
      />
      <Box sx={{ textAlign: 'center', mt: -2 }}>
        <Button component={RouterLink} to="/contact" variant="outlined" color="secondary">
          Contact Support
        </Button>
      </Box>
    </Box>
  )
}
