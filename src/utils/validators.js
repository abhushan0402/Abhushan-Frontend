import { z } from 'zod'

// Regex patterns mirror the Abhushan Vatika API contract exactly so client
// validation never diverges from what the server will accept.
const MOBILE_REGEX = /^[6-9][0-9]{9}$/
const PINCODE_REGEX = /^[1-9][0-9]{5}$/
const OTP_REGEX = /^[0-9]{6}$/

export const mobileSchema = z
  .string()
  .regex(MOBILE_REGEX, 'Enter a valid 10-digit Indian mobile number')

export const emailSchema = z.string().email('Enter a valid email address')

export const identifierSchema = z
  .string()
  .min(1, 'Email or mobile number is required')
  .refine(
    (val) => emailSchema.safeParse(val).success || MOBILE_REGEX.test(val),
    'Enter a valid email address or 10-digit mobile number'
  )

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(50, 'Password must be under 50 characters')

export const otpSchema = z.string().regex(OTP_REGEX, 'Enter the 6-digit OTP')

export const signinSchema = z.object({
  identifier: identifierSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
})

export const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: emailSchema,
  mobile: mobileSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const otpFormSchema = z.object({
  otp: otpSchema,
})

export const forgotPasswordIdentifierSchema = z.object({
  identifier: identifierSchema,
})

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const addressSchema = z.object({
  label: z.string().min(1, 'Label is required').max(50),
  fullName: z.string().min(1, 'Full name is required').max(100),
  mobile: mobileSchema,
  addressLine1: z.string().min(1, 'Address line 1 is required').max(200),
  addressLine2: z.string().max(200).optional().or(z.literal('')),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  pincode: z.string().regex(PINCODE_REGEX, 'Enter a valid 6-digit pincode'),
  isDefault: z.boolean().optional(),
})

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  mobile: mobileSchema.optional().or(z.literal('')),
  dateOfBirth: z.string().optional().or(z.literal('')),
  gender: z.enum(['male', 'female', 'other']).optional(),
})

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().min(3, 'Please share a few words').max(1000),
})
