import React, {useContext, useState, useEffect} from 'react'
import Image from 'next/image'
import CurrentBusinessContext from '../../context/currentBusinessContext'
import UserLocationContext from '../../context/userLocationContext';

function DistanceIndicator() {
  const {crtBusiness} = useContext(CurrentBusinessContext);
  const {location} = useContext(UserLocationContext);
  const [distance, setDistance] = useState<number>(0.0);
  

  const calculateDistance = (lat1:number, lon1:number, lat2:number, lon2:number) => {
     
    const earthRadius = 6371; // in kilometers

    const degToRad = (deg:number) => {
      return deg * (Math.PI / 180);
    };

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
   
    setDistance(Number(distance.toFixed(2)))
   
  };

  useEffect(()=>{
    if(location && crtBusiness){
       calculateDistance(location.lat, location.lng, crtBusiness.location.lat, crtBusiness.location.lng);
    }
 },[crtBusiness,location])

 const onDirectionClick= ()=>{
     window.open('https://www.google.com/maps/dir/?api=1&origin=' +
         location.lat + ',' + location.lng + '&destination='
         + crtBusiness.location.lat
         + ',' + crtBusiness.location.lng + '&travelmode=driving')

 }
  return (
    crtBusiness ? <div className="fixed flex right-10 bottom-3 space-x-2 rounded-xl p-4 items-center justify-between bg-[#222831] w-[280px] h-[100px]">
       <div className="space-y-1 font-serif truncate">
             <div className='text-[20px] text-[#EEEEEE] font-semibold'>{crtBusiness.name}</div>
             <div className='text-[16px] text-[#EEEEEE]'>{distance} kilometers away</div>
       </div>
          <div onClick={()=>onDirectionClick()} className="hover:bg-[#00ADB5]/40 bg-[#00ADB5]/20 transition cursor-pointer
           duration-500 rounded-lg w-[70px] h-[70px] flex items-center justify-center">
              <Image className='w-[70px] h-[70px] hover:scale-110 transition duration-500
        px-1 rounded-xl cursor-pointer' src={'/goto.png'} width={50} height={50} alt='nst'>

              </Image>
          </div>
      
    </div> : <div></div>
  )
}

export default DistanceIndicator