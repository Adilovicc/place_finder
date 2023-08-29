import React, { useEffect, useState, useContext } from 'react'
import $ from 'jquery'
import axios from 'axios';
import baseUrl from '../../BaseUrl';
import UserLocationContext from '../../context/userLocationContext';
import BusinessListContext from '../../context/businessListContext';

interface Item{
  name: String,
  opening_hours: {open_now: boolean} | null,
  vicinity: String,
  rating: number,
  reference: String,
  location:any,
  icon: String,
  ref: String
}


function SearchBar() {

  const focusSearch = ()=>{
    $('#searchInput').focus();
  }

  const [srcValue, setSrcValue] = useState<String>('');
  const {location} = useContext(UserLocationContext);
  const {bList,setBList} = useContext(BusinessListContext);


  useEffect(()=>{
      if(srcValue){
        axios({
          url:baseUrl+'api/getSearchedPlaces',
          method:'GET',
          params:{
             lng:location.lng,
             lat:location.lat,
             searchtext: srcValue
          }
        }).then((res)=>{
            console.log(res.data);
            let temp: Item[] = [];
            res.data.results.map((item:any, index:number)=>(
                 temp.push(
                    {
                      name: item.name,
                      opening_hours: item.opening_hours ? item.opening_hours : "No information",
                      vicinity: item.formatted_address.split(',').length>2 ? item.formatted_address.split(',').slice(0,-1).join(',') : item.formatted_address,
                      rating: item.rating ? item.rating : 0,
                      reference: item.photos ? item.photos[0]?.photo_reference : null,
                      location: item.geometry.location,
                      icon: item.icon,
                      ref: item.reference
                    }
                 )
            ));
            console.log(temp);
            setBList(temp);
        })
      }
  },[srcValue])

  return (
    <div onClick={()=>focusSearch()} className='flex cursor-pointer gap-3 p-3 rounded-xl bg-[#222831]'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
           id="searchInput"
           className="tracking-wider outline-none bg-transparent text-[#ffffff] placeholder-[#ffffff]"
           type='text'
           //@ts-ignore
           onKeyDown={(e)=>{if (e.key=='Enter'){if(e.target.value) setSrcValue(e.target.value)}}}
           placeholder='Search'>
        </input>
    </div>
  )
}

export default SearchBar