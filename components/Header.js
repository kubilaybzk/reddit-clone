import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='relative w-28 h-14'>
        <Image src="/Reddit-Logo.png" layout='fill' objectFit='contain' />
    </div>
  )
}

export default Header