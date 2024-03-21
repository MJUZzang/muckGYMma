import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className='w-full flex border-t-[1px] h-[50px] justify-evenly items-center'>
      <Link href="/feed" className=''>Home</Link>
      <Link href="/feed" className=''>Home</Link>
      <Link href="/feed" className=''>Home</Link>
    </div>
  )
}

export default NavBar