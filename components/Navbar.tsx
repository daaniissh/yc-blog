
import { auth, signIn, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Navbar = async () => {
  const session = await auth()

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href="/" className='w-[120px] md:w-auto' >
          <Image src="/logo.png" alt='logo' width={144} height={30} />
        </Link>
        <div className='flex items-center gap-5'>
          {session && session?.user ? (
            <>
              <Link href="/startup/create" >
                <Button className='text-white'   >Create</Button>
                {/* <div className="w-9 h-9 sm:hidden border-2 rounded-full flex justify-center items-center border-primary">

                  <Plus className='size-6 ' />
                </div> */}
              </Link>
              <form action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }} >
                <button type='submit' className='flex items-center' >
                  <span className='max-md:hidden' >Logout</span>
                  <LogOut className='size-6 sm:hidden text-red-500' />
                </button>


              </form>
              <Link href={`/user/${session?.id}`} >

                <Avatar className='size-10' >
                  <AvatarImage src={session?.user?.image || ""} alt="profile image" />
                  <AvatarFallback>{session?.user?.name || ""}</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form action={async () => {
              "use server"
              await signIn('github')
            }} >
              <button type='submit' >Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar