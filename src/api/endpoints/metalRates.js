import axiosClient from '../axiosClient'

// Public endpoint — no auth required, matches GET /api/metal-rates/ in the
// swagger. Returns gold (24K + 22K) and silver (999.9 purity) rates only;
// there is no separate 925/sterling-silver rate field.
export const getMetalRates = () =>
  axiosClient.get('/api/metal-rates/').then((res) => res.data)
