import React from 'react'
import Image from 'next/image'

interface Item{
    name: String,
    opening_hours: {open_now: boolean},
    vicinity: String,
    rating: number,
    reference: String,
    location:any
}

const key= process.env.REACT_APP_GOOGLE_API_KEY;

function BusinessItem({item}:any ) {
 
  
    
    return (
        <div className="flex items-center p-1 hover:bg-[#f9f7f7] border-b-[2px] border-gray-600/40 gap-3
         group cursor-pointer transition duration-300">
            <div className='relative w-[80px] h-[80px] overflow-hidden rounded-lg'>
            <Image src={item.reference ? `
              https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.reference}&key=AIzaSyBwtCo-JGWULMIKP1fojEaUIuLhxgt00QQ
            ` : item.icon}
                fill
                alt="bsnsImage"
                className='rounded-lg object-center group-hover:scale-125 transition-all duration-500 ease-out h-[80px] w-[80px]  object-cover '>

            </Image>
            </div>
            <div className="text-[#151515] ">
                <h3 className='text-xl font-semibold '>{item.name}</h3>
                <h4 className='text-lg text-gray-600 text-[16px]'>{item.vicinity}</h4>
                <div className='flex items-center'>
                    {item.rating ? 
                    
                    
                        [1,2,3,4,5].map((itm,i)=>{
                            return(
                           (itm<=Number(item.rating)) ? 
                           (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="#FFD700" viewBox="0 0 24 24" strokeWidth="0.4" stroke="currentColor" className="w-6 h-6">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                           ) 
                           :
                           (
                           (itm-Number(item.rating)<1) && 
                           <svg key={i} viewBox="0 0 24 24" width="24" height="24" >
                            <defs>
                              <clipPath id={`half-star${item.ref}`} clipPathUnits="objectBoundingBox">
                                <rect x="0" y="0" width={`${(1-itm+Number(item.rating))}`} height="1" />
                              </clipPath>
                            </defs>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFD700" viewBox="0 0 24 24" strokeWidth="0.4" stroke="currentColor" className="w-6 h-6" clipPath={`url(#half-star${item.ref})`}>   
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                           </svg>
                           ) 
                          )
                        }
                      )
                      

                    : null}
                    <h3 className="">{item.rating ? item.rating : 'No reviews'}</h3>
                </div>
            </div>
        </div>
    )
}

export default BusinessItem