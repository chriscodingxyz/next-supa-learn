'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { createAdmin } from '@/utils/supabase/server'
import { encodedRedirect } from '@/utils/utils'

export const logAction = async (message: string, type: 'error' | 'info') => {
  const supabaseAdmin = createAdmin()
  const { error } = await supabaseAdmin
    .from('logs')
    .insert({ message: 'Action:' + message, type })
}

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const supabaseAdmin = createAdmin()
  const origin = headers().get('origin')

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  })

  if (error) {
    console.error(error.code + ' ' + error.message)
    return encodedRedirect('error', '/sign-up', error.message)
  } else {
    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.'
    )
  }
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabaseAdmin = createAdmin()

  const { error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message)
  }

  return redirect('/protected')
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const supabaseAdmin = createAdmin()
  const origin = headers().get('origin')
  const callbackUrl = formData.get('callbackUrl')?.toString()

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required')
  }

  const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password'
    )
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  )
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabaseAdmin = createAdmin()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required'
    )
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Passwords do not match'
    )
  }

  const { error } = await supabaseAdmin.auth.updateUser({
    password: password
  })

  if (error) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password update failed'
    )
  }

  encodedRedirect('success', '/protected/reset-password', 'Password updated')
}

export const signOutAction = async () => {
  const supabaseAdmin = createAdmin()
  await supabaseAdmin.auth.signOut()
  return redirect('/sign-in')
}

export async function logMessageAction (
  message: string,
  type: 'error' | 'info' | 'clientError' | 'middleware'
) {
  const supabaseAdmin = createAdmin()

  // no user checks are needed for logging errors

  const { error } = await supabaseAdmin
    .from('logs')
    .insert({ message: 'Action:' + message, type })

  if (error) {
    console.error('Error logging message:', error)
    throw new Error('Failed to log message')
  }

  return { success: true }
}
