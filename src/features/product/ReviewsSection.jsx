import { useState } from 'react'
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Divider,
  Avatar,
  Stack,
  Pagination,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProductReviews, useCreateReview } from '../../hooks/useReviews'
import { useIsAuthenticated } from '../../hooks/useAuth'
import { reviewSchema } from '../../utils/validators'
import { TextBlockSkeleton } from '../../components/common/Skeletons'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'

function initials(name = '') {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function ReviewsSection({ productId }) {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useProductReviews(productId, { page, limit: 10 })
  const createReview = useCreateReview(productId)
  const isAuthenticated = useIsAuthenticated()
  const [showForm, setShowForm] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: '' },
  })

  const reviews = data?.reviews ?? []

  const onSubmit = (values) => {
    createReview.mutate(values, {
      onSuccess: () => {
        reset({ rating: 0, comment: '' })
        setShowForm(false)
      },
    })
  }

  if (isLoading) return <TextBlockSkeleton lines={4} />

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem' }}>
          Customer Reviews ({reviews.length})
        </Typography>
        {isAuthenticated ? (
          <Button
            size="small"
            startIcon={<RateReviewOutlinedIcon />}
            onClick={() => setShowForm((v) => !v)}
          >
            Write a Review
          </Button>
        ) : null}
      </Box>

      {showForm ? (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mb: 4, p: 3, bgcolor: '#faf7f1' }}
        >
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Your Rating
                </Typography>
                <Rating
                  {...field}
                  onChange={(_, val) => field.onChange(val)}
                  precision={1}
                />
                {errors.rating ? (
                  <Typography variant="caption" color="error" display="block">
                    {errors.rating.message}
                  </Typography>
                ) : null}
              </Box>
            )}
          />
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                minRows={3}
                placeholder="Share your experience with this piece..."
                error={Boolean(errors.comment)}
                helperText={errors.comment?.message}
                sx={{ mb: 2, bgcolor: '#fff' }}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary" disabled={createReview.isPending}>
            {createReview.isPending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </Box>
      ) : null}

      {reviews.length === 0 ? (
        <Typography sx={{ color: 'text.secondary' }}>
          No reviews yet. Be the first to share your experience.
        </Typography>
      ) : (
        <Stack divider={<Divider />} spacing={2.5}>
          {reviews.map((review) => (
            <Box key={review._id} sx={{ display: 'flex', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#c9a667', color: '#0b0b0c', width: 40, height: 40 }}>
                {initials(review.userName ?? review.user?.firstName ?? 'A')}
              </Avatar>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {review.userName ?? review.user?.firstName ?? 'Verified Buyer'}
                  </Typography>
                  <Rating value={review.rating} size="small" readOnly />
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {review.comment}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      )}

      {data?.pagination?.totalPages > 1 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={data.pagination.totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      ) : null}
    </Box>
  )
}
