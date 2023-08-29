import '../styles/globals.css'
import { CategoryContextProvider } from '../context/categoryContext'
import { useEffect, useState } from 'react';
import UserLocationContext from '../context/userLocationContext';
import { BusinessListProvider } from '../context/businessListContext';
import CurrentBusinessContext from '../context/currentBusinessContext';
import {CurrentBusinessProvider} from '../context/currentBusinessContext'

interface Location{
    lat: String,
    lng: String,
}

export const dynamic = 'force-dynamic'

export default function MyApp({ Component, pageProps }:any) {
  
    const [location, setLocation] = useState<Location | null>(null);
    function success(pos:any) {
        const crd = pos.coords;
      
        console.log("Your current position is:");
        console.log(`Latitude : ${String(crd.latitude)}`);
        console.log(`Longitude: ${String(crd.longitude)}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        if(crd){
            setLocation({lat:String(crd.latitude), lng:String(crd.longitude)});
        }
      }
    

    useEffect(()=>{
       console.log(location);
    },[location])

    const getLocation = ()=>{
        navigator.geolocation.getCurrentPosition(success);
    }

    useEffect(()=>{
          getLocation();
    },[])

  return (
      <UserLocationContext.Provider value={{location, setLocation}}>
          <CategoryContextProvider>
            <BusinessListProvider>
              <CurrentBusinessProvider>
               <Component {...pageProps} />
               </CurrentBusinessProvider>
            </BusinessListProvider>
          </CategoryContextProvider>
      </UserLocationContext.Provider>
  
  )
}

