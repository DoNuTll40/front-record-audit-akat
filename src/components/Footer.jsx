import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='fixed bottom-0 w-full h-8 bg-gray-100 dark:bg-gray-800 text-xs font-light select-none transition-all duration-200 ease-in-out z-50'>
        <div className='flex gap-1 items-center justify-start h-full max-w-[98vw] mx-auto'>
            <p>&copy; Copyright 2025</p>
            <Link href={"http://akathospital.com/"} target='_blank' className='hover:text-blue-700 hover:underline'>โรงพยาบาลอากาศอำนวย</Link>
        </div>
    </div>
  )
}
