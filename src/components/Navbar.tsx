import Image from 'next/image'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='fixed top-0 w-full h-16 border-b border-white/10 backdrop-blur-xl items-center flex px-7 justify-between z-50'>
        <div className='flex justify-center items-center'>
            <Image src={'/logo.png'} alt='logo' width={25} height={25}/>
            <span className='text-xl font-medium text-white/70'>EchoForms</span>
        </div>
    </nav>
  )
}
