import Link from 'next/link'

import { signOutAction } from '@/app/actions'
import { getServerAuthUser } from '@/lib/server-utils'

import { Button } from './ui/button'


export default async function AuthButton () {
  // const {
  //   data: { user },
  // } = await createAdmin().auth.getUser();

  const user = await getServerAuthUser()

  return user ? (
    <div className='flex items-center gap-4'>
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button type='submit' variant={'outline'}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className='flex gap-2'>
      <Button asChild size='sm' variant={'outline'}>
        <Link href='/sign-in'>Sign in</Link>
      </Button>
      <Button asChild size='sm' variant={'default'}>
        <Link href='/sign-up'>Sign up</Link>
      </Button>
    </div>
  )
}
