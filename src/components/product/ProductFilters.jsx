import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Divider,
} from '@mui/material'
import { useState } from 'react'
import { METAL_TYPES, GENDERS } from '../../utils/constants'
import { useProductTypes } from '../../hooks/useCategories'

const MAX_PRICE = 500000
const MAX_WEIGHT = 200

function rangeFromFilters(filters) {
  return {
    price: [Number(filters.minPrice) || 0, Number(filters.maxPrice) || MAX_PRICE],
    weight: [Number(filters.minWeight) || 0, Number(filters.maxWeight) || MAX_WEIGHT],
  }
}

export default function ProductFilters({ filters, onChange, onClear }) {
  const { data: productTypes = [] } = useProductTypes()
  const externalRange = rangeFromFilters(filters)

  // Local slider state, kept in sync with the URL-driven filters prop via
  // React's "adjust state during render" pattern (comparing against the
  // last-seen prop values) rather than an effect + extra render pass.
  const [trackedFilterKey, setTrackedFilterKey] = useState(
    `${filters.minPrice}-${filters.maxPrice}-${filters.minWeight}-${filters.maxWeight}`
  )
  const [priceRange, setPriceRange] = useState(externalRange.price)
  const [weightRange, setWeightRange] = useState(externalRange.weight)

  const currentFilterKey = `${filters.minPrice}-${filters.maxPrice}-${filters.minWeight}-${filters.maxWeight}`
  if (currentFilterKey !== trackedFilterKey) {
    setTrackedFilterKey(currentFilterKey)
    setPriceRange(externalRange.price)
    setWeightRange(externalRange.weight)
  }

  const toggleValue = (key, value) => {
    const current = filters[key]
    onChange({ ...filters, [key]: current === value ? undefined : value })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '1rem' }}>
          Filters
        </Typography>
        <Button size="small" onClick={onClear} sx={{ fontSize: '0.7rem' }}>
          Clear All
        </Button>
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      <Typography variant="subtitle2" sx={{ mb: 1, letterSpacing: '0.08em', fontSize: '0.75rem' }}>
        METAL
      </Typography>
      <FormGroup sx={{ mb: 2.5 }}>
        {METAL_TYPES.map((m) => (
          <FormControlLabel
            key={m.value}
            control={
              <Checkbox
                size="small"
                checked={filters.metalType === m.value}
                onChange={() => toggleValue('metalType', m.value)}
              />
            }
            label={<Typography variant="body2">{m.label}</Typography>}
          />
        ))}
      </FormGroup>

      <Typography variant="subtitle2" sx={{ mb: 1, letterSpacing: '0.08em', fontSize: '0.75rem' }}>
        GENDER
      </Typography>
      <FormGroup sx={{ mb: 2.5 }}>
        {GENDERS.map((g) => (
          <FormControlLabel
            key={g.value}
            control={
              <Checkbox
                size="small"
                checked={filters.gender === g.value}
                onChange={() => toggleValue('gender', g.value)}
              />
            }
            label={<Typography variant="body2">{g.label}</Typography>}
          />
        ))}
      </FormGroup>

      {productTypes.length > 0 ? (
        <>
          <Typography variant="subtitle2" sx={{ mb: 1, letterSpacing: '0.08em', fontSize: '0.75rem' }}>
            PRODUCT TYPE
          </Typography>
          <FormGroup sx={{ mb: 2.5, maxHeight: 220, overflowY: 'auto' }}>
            {productTypes.map((t) => (
              <FormControlLabel
                key={t.productType}
                control={
                  <Checkbox
                    size="small"
                    checked={filters.productType === t.productType}
                    onChange={() => toggleValue('productType', t.productType)}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {t.name}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </>
      ) : null}

      <Typography variant="subtitle2" sx={{ mb: 1, letterSpacing: '0.08em', fontSize: '0.75rem' }}>
        PRICE (₹)
      </Typography>
      <Box sx={{ px: 1, mb: 2.5 }}>
        <Slider
          value={priceRange}
          onChange={(_, val) => setPriceRange(val)}
          onChangeCommitted={(_, val) =>
            onChange({ ...filters, minPrice: val[0] || undefined, maxPrice: val[1] })
          }
          min={0}
          max={MAX_PRICE}
          step={5000}
          size="small"
          valueLabelDisplay="auto"
          color="primary"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption">₹{priceRange[0].toLocaleString('en-IN')}</Typography>
          <Typography variant="caption">₹{priceRange[1].toLocaleString('en-IN')}</Typography>
        </Box>
      </Box>

      <Typography variant="subtitle2" sx={{ mb: 1, letterSpacing: '0.08em', fontSize: '0.75rem' }}>
        WEIGHT (g)
      </Typography>
      <Box sx={{ px: 1, mb: 1 }}>
        <Slider
          value={weightRange}
          onChange={(_, val) => setWeightRange(val)}
          onChangeCommitted={(_, val) =>
            onChange({ ...filters, minWeight: val[0] || undefined, maxWeight: val[1] })
          }
          min={0}
          max={MAX_WEIGHT}
          step={1}
          size="small"
          valueLabelDisplay="auto"
          color="primary"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption">{weightRange[0]}g</Typography>
          <Typography variant="caption">{weightRange[1]}g</Typography>
        </Box>
      </Box>
    </Box>
  )
}
