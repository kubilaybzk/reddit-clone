import Image from 'next/image'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
export default function Avatar({seed,large}) {
    const { data: session } = useSession();
  return (
    <div className={`relative h-10 w-10  overflow-hidden rounded-full border-gray-300 bg-white ${large && "h-20 w-20"}`}>
        <Image
        layout='fill'
        objectFit='contain'
        src={ `https://avatars.dicebear.com/api/open-peeps/ ${ seed || session?.user?.name || 'placeholder'}.svg`}/>
    </div>
  )
}
