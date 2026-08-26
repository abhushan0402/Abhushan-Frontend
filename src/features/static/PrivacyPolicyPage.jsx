import { Box, Typography, Stack } from '@mui/material'

const SECTIONS = [
  {
    title: 'Information We Collect',
    body: 'We collect the information you provide when you create an account, place an order, or contact us — including your name, email, mobile number, delivery addresses, and order history.',
  },
  {
    title: 'How We Use Your Information',
    body: 'Your information is used to process orders, manage your account, communicate order and delivery updates, and improve our products and services. We do not sell your personal information to third parties.',
  },
  {
    title: 'Payment Information',
    body: 'Payments are processed securely through Razorpay. We do not store your card, UPI, or banking details on our servers.',
  },
  {
    title: 'Data Security',
    body: 'We use industry-standard measures to protect your information, including encrypted connections and access-controlled systems.',
  },
  {
    title: 'Your Rights',
    body: 'You can view and update your profile and address information at any time from My Account, and may request deletion of your account by contacting our support team.',
  },
  {
    title: 'Contact Us',
    body: "If you have questions about this policy, please reach out via our Contact page.",
  },
]

export default function PrivacyPolicyPage() {
  return (
    <Box className="av-container" sx={{ py: { xs: 6, md: 10 }, maxWidth: 820 }}>
      <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mb: 1 }}>
        Privacy Policy
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
