'use server'

import { redirect } from 'next/navigation'

import { createAdmin } from '@/utils/supabase/server'

export async function addTodoAction (formData: FormData) {
  const task = formData.get('task')?.toString()

  if (!task) {
    return { error: 'Task is required' }
  }

  const supabaseAdmin = createAdmin()

  const {
    data: { user }
  } = await supabaseAdmin.auth.getUser()

  if (!user) {
    redirect('/sign-in?error=You must be signed in to create a todo')
  }

  const { error } = await supabaseAdmin
    .from('todos')
    .insert({ task, user_id: user?.id })

  if (error) {
    return { error: 'Failed to create todo' }
  }

  return { success: true }
}
