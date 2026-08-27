import { useState } from 'react'
import { Box, Typography, Button, Grid2 as Grid, Chip, IconButton, Stack } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import {
  useAddresses,
  useAddAddress,
  useUpdateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
} from '../../hooks/useAddresses'
import AddressFormDialog from './AddressFormDialog'
import EmptyState from '../../components/common/EmptyState'
import { ProductGridSkeleton } from '../../components/common/PageSkeleton'

export default function AddressesPage() {
  const { data: addresses = [], isLoading } = useAddresses()
  const addAddress = useAddAddress()
  const updateAddress = useUpdateAddress()
  const deleteAddress = useDeleteAddress()
  const setDefaultAddress = useSetDefaultAddress()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const handleSubmit = (values) => {
    const mutation = editing
      ? updateAddress.mutateAsync({ addressId: editing._id, payload: values })
      : addAddress.mutateAsync(values)

    mutation.then(() => {
      setDialogOpen(false)
      setEditing(null)
    })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1.1rem' }}>
          Saved Addresses
        </Typography>
        <Button
          startIcon={<AddRoundedIcon />}
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => {
            setEditing(null)
            setDialogOpen(true)
          }}
        >
          Add Address
        </Button>
      </Box>

      {isLoading ? (
        <ProductGridSkeleton count={2} />
      ) : addresses.length === 0 ? (
        <EmptyState
          icon={<LocationOnOutlinedIcon fontSize="inherit" />}
          title="No addresses saved yet"
          description="Add an address to speed up checkout."
        />
      ) : (
        <Grid container spacing={2}>
          {addresses.map((addr) => (
            <Grid key={addr._id} size={{ xs: 12, sm: 6 }}>
              <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '12px', p: 2.5, position: 'relative' }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>{addr.label}</Typography>
                  {addr.isDefault ? (
                    <Chip label="Default" size="small" color="primary" />
                  ) : null}
                </Stack>
                <Typography variant="body2">{addr.fullName}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {addr.addressLine1}
                  {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {addr.city}, {addr.state} - {addr.pincode}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {addr.mobile}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  {!addr.isDefault ? (
                    <Button size="small" onClick={() => setDefaultAddress.mutate(addr._id)}>
                      Set Default
                    </Button>
                  ) : null}
                  <Box sx={{ flex: 1 }} />
                  <IconButton
                    size="small"
                    onClick={() => {
                      setEditing(addr)
                      setDialogOpen(true)
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => deleteAddress.mutate(addr._id)}>
                    <DeleteOutlineRoundedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <AddressFormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setEditing(null)
        }}
        onSubmit={handleSubmit}
        initialValue={editing}
        isSubmitting={addAddress.isPending || updateAddress.isPending}
      />
    </Box>
  )
}
