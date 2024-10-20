import React from 'react'

import { redirect } from 'next/navigation'

import { addTodoAction } from '@/actions/actions'
import { createAdmin } from '@/utils/supabase/server'

export default async function page () {
  const supabaseAdmin = createAdmin()

  const {
    data: { user }
  } = await supabaseAdmin.auth.getUser()

  if (!user) {
    return redirect(
      '/sign-in?clientError=You must be signed in to create a todo'
    )
  }

  const { data: todos } = await supabaseAdmin
    .from('todos')
    .select('*')
    .eq('user_id', user.id)

  return (
    <>
      {JSON.stringify(todos?.map(todo => todo.task))}

      <form action={addTodoAction}>
        <input type='text' name='todo' />
        <button type='submit'>Add todo</button>
      </form>
    </>
  )
}
