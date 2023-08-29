import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import $ from 'jquery'

interface menuIcon {
    name: String,
    logo: String
}

function Sidebar() {
  const menuIcons: menuIcon[]= [
    {
        name:'magnifyIcon',
        logo:'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
    },
    {
        name:'heartIcon',
        logo:'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
    }
  ]
  
  const focusSearch = ()=>{
    $('#searchInput').focus();
  }

  return (
    <div className='flex flex-col items-center min-w-[70px] w-[70px] 
    space-y-4 sticky top-0 bg-[#222831] h-screen py-5 shadow-lg shadow-[#393E46]'>
        <Image 
        className='mb-4'
        src='/navIcn.webp'
        alt='logo'
        width={50}
        height={50}>     
        </Image>

        {menuIcons.map((item:menuIcon, idx: number)=>(
            <svg onClick={()=>{item.name=='magnifyIcon' && focusSearch()}} key={idx} xmlns="http://www.w3.org/2000/svg" fill="none" 
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className="w-10 h-10 text-[#00ADB5] transition-all duration-500 
            cursor-pointer hover:text-[#00ADB5] rounded-lg hover:bg-[#393E46]">
            <path strokeLinecap="round" strokeLinejoin="round" d={`${item.logo}`} />
          </svg>
        ))}
    </div>
  )
}

export default Sidebar