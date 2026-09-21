'use server'

import { createClient } from '../../../utils/supabase/server'

export async function resetPassword(previousState, formData) {
  const email = formData.get('email')?.toString().trim()

  if (!email) {
    return { error: 'Enter your email address.' }
  }

  const supabase = await createClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const redirectTo = new URL('/auth/update-password', siteUrl).toString()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })

  if (error) {
    return { error: 'We could not send a reset email. Please try again.' }
  }

  return {
    success: 'If an account exists for that email, a password reset link is on its way.',
  }
}