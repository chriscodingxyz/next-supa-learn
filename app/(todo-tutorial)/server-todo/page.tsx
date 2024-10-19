import { createAdmin } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import React from 'react'

async function addTodoAction(formData: FormData) {
  'use server'
  const supabaseAdmin = createAdmin();

  const {
    data: { user },
  } = await supabaseAdmin.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const todo = formData.get('todo')

const {data, error} = await supabaseAdmin.from('todos').insert([{user_id: user.id, task: todo}])

return data


}

export default async function page() {
  const supabaseAdmin = createAdmin();

  const {
    data: { user },
  } = await supabaseAdmin.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const {data: todos} = await supabaseAdmin.from('todos').select('*').eq('user_id', user.id)

  return (
    <>{JSON.stringify(todos?.map(todo => todo.task))}
    
    <form action={addTodoAction}>
      <input type="text" name="todo" />
      <button type="submit">Add todo</button>
    </form>
    
    </>
  )
}
