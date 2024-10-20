import Hero from '@/components/Hero'
import { createAdmin } from '@/utils/supabase/server'

export default async function Index () {
  const supabaseAdmin = createAdmin()

  const { data: todos } = await supabaseAdmin.from('todos').select('task')

  return (
    <>
      <Hero />
      {/* <h1>ALL TODOS</h1>
      {JSON.stringify(todos?.map(todo => todo.task))} */}
      <main className='flex-1 flex flex-col gap-6 px-4'></main>
    </>
  )
}
