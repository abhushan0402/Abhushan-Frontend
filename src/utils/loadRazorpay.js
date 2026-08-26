const SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'

let loadPromise = null

// Loads the Razorpay Checkout widget script once and caches the promise so
// repeat checkout attempts don't re-inject the tag. Resolves to false (not
// throws) on failure so callers can show a friendly "couldn't load payment
// gateway" message instead of an unhandled rejection.
export function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve(true)
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.onload = () => resolve(true)
    script.onerror = () => {
      loadPromise = null
      resolve(false)
    }
    document.body.appendChild(script)
  })

  return loadPromise
}
