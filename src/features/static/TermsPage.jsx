import { Box, Typography, Stack } from '@mui/material'

const SECTIONS = [
  {
    title: 'Orders & Pricing',
    body: 'All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Making charges may vary and are confirmed at the time of order. We reserve the right to correct pricing errors before an order is confirmed.',
  },
  {
    title: 'Payments',
    body: 'We accept Cash on Delivery and online payments (Card, UPI, Netbanking) via Razorpay. Orders are confirmed once payment is verified or, for Cash on Delivery, once the order is placed.',
  },
  {
    title: 'Shipping & Delivery',
    body: 'All orders are shipped fully insured. Delivery timelines vary by location and are communicated at checkout and via order updates.',
  },
  {
    title: 'Returns & Exchange',
    body: 'We offer a lifetime exchange policy at fair value on eligible pieces. For returns, exchanges, or order issues, please contact our support team.',
  },
  {
    title: 'Product Authenticity',
    body: 'All gold and silver jewellery is BIS Hallmarked, certifying purity. Product images are representative; actual weight and appearance may vary slightly due to the handcrafted nature of each piece.',
  },
  {
    title: 'Account Responsibility',
    body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.',
  },
]

export default function TermsPage() {
  return (
    <Box className="av-container" sx={{ py: { xs: 6, md: 10 }, maxWidth: 820 }}>
      <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mb: 1 }}>
        Terms &amp; Conditions
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 6 }}>
        Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
      </Typography>

      <Stack spacing={4}>
        {SECTIONS.map((section) => (
          <Box key={section.title}>
            <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem', mb: 1 }}>
              {section.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{section.body}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
