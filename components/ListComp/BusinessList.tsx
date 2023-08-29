import React, { useState, useEffect, useContext } from 'react'
import BusinessItem from './BusinessItem'
import GlobalAPI from '../../utils/GlobalAPI';
import CategoryContext from '../../context/categoryContext';
import axios from 'axios';
import baseUrl from '../../BaseUrl';
import ShimmerItemElement from '../ShimmerItemElement';
import UserLocationContext from '../../context/userLocationContext';
import BusinessListContext from '../../context/businessListContext';
import CurrentBusinessContext from '../../context/currentBusinessContext';
import _ from 'lodash'

interface Item{
    name: String,
    opening_hours: {open_now: boolean} | String,
    vicinity: String,
    rating: number,
    reference: String,
    icon: String,
    location:any,
    ref: String
}

function BusinessList() {
  const [pageNum, setPageNum] = useState<number>(0);
  const [places, setPlaces] = useState<Item[]>([]);
  const {category} = useContext(CategoryContext);
  const [loading, setLoading] = useState(false);

  const {bList, setBList} = useContext(BusinessListContext);
  const {location, setLocation} = useContext(UserLocationContext);
  const {crtBusiness, setCrtBusiness} = useContext(CurrentBusinessContext);

    useEffect(() => {
        if (location) {
           setLoading(true);
           setPlaces([]);
           setBList([]);
            GlobalAPI.getNearbyPlaces(category, location.lat, location.lng).then((res) => {
                console.log("A ovdje je....", category);

                const placesVar: Item[] = res.data.results.map((item: any, idx: number) => (
                    {
                        name: item.name,
                        opening_hours: item.opening_hours ? { open_now: item.opening_hours.open_now } : 'No information',
                        vicinity: item.vicinity,
                        rating: item.rating ? item.rating : 0,
                        reference: item.photos ? item.photos[0]?.photo_reference : null,
                        icon: item.icon,
                        location: item.geometry.location,
                        ref: item.reference
                    }
                ))
                setPlaces(placesVar);
                setBList(placesVar);
                setLoading(false);
                setPageNum(0);
            }
            );
        }
    }, [category, location])

  useEffect(()=>{
   console.log(bList);
  },[places])

  return (
     <div className="space-y-4">
          <div className="mt-8 flex justify-between text-[#393E46] items-center gap-4">
              <h2 className="font-serif tracking-wide px-2 rounded-xl truncate">Top Nearby Places</h2>
              <div className='flex gap-4'>
                  {pageNum>0 ? <svg onClick={()=>setPageNum(prevPage=>prevPage-1)}
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5"
                      stroke="currentColor" className="w-8 h-8 transition-all duration-300
                      cursor-pointer hover:bg-[#00acb55b] rounded-xl">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg> : null}
                  {(pageNum+1)*4 < places.length && <svg onClick={()=>setPageNum(prevPage=>prevPage+1)} 
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5"
                      stroke="currentColor" className="w-8 h-8 transition-all duration-300 
                      cursor-pointer hover:bg-[#00acb55b] rounded-xl">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>}
              </div>
          </div>
          <div className=''>
            {
              places.length>0 && _.orderBy(bList).map((item:Item, idx:number)=>(
               pageNum*4+4>idx && pageNum*4<=idx && <div key={idx} onClick={()=>setCrtBusiness(item)}>
                  <BusinessItem item={item}></BusinessItem>
                </div>
              ))
            }
            {loading && [1,2,3].map((item:number, idx:number)=>(<div key={idx}><ShimmerItemElement></ShimmerItemElement></div>)) }
          </div>
    </div>
  )
}

export default BusinessList