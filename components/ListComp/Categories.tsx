import React, { useState, useEffect, useContext } from 'react'
import CategoriesData from '../../utils/Data'
import Image from 'next/image'
import CategoryContext from '../../context/categoryContext';



interface CatData {
    id:number,
    name:String,
    value:String,
    icon:String
}

function Categories() {
    const [categories, setCategories] = useState<CatData[]>([]);
    
    useEffect(()=>{
       setCategories(CategoriesData)
    },[])

    const {category, setCategory} = useContext(CategoryContext);
  return (
    <div>
        <h2 className='mt-6 text-[#393E46] flex justify-center tracking-wide font-serif'>Select the category you want to see on the Map</h2>
        <div className="flex justify-center gap-2 flex-wrap mt-4">
        {
            categories.map((item:CatData, idx:number)=>(
                <div onClick={()=>setCategory(item.value)} key={idx} className=" relative w-[140px] rounded-lg bg-[#222831] p-2 hover:scale-105 
                transition-all duration-300 cursor-pointer">
                    <Image className='m-auto' src={`${item.icon}`} alt={`${item.name}`} width={45} height={45}></Image>
                    <div className='text-[#EEEEEE] m-auto flex 
                    justify-center items-center font-serif font-bold'>{item.name}</div>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default Categories