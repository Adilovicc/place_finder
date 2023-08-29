
import { GoogleMap, LoadScript, MarkerF, Marker, useJsApiLoader, useLoadScript } from '@react-google-maps/api'
import React, { useContext, useEffect, useState } from 'react'
import UserLocationContext from '../../context/userLocationContext'
import BusinessListContext from '../../context/businessListContext';
import CurrentBusinessContext from '../../context/currentBusinessContext';

interface Item{
    name: String,
    opening_hours: {open_now: boolean} | String,
    vicinity: String,
    rating: number,
    reference: String,
    icon: String,
    location: any
}

function GoogleMapComponent() {
  const {location, setLocation} = useContext(UserLocationContext);
  
  const containerStyle={
    width:'100%',
    height:'400px',
    borderRadius:18,
  }
 
  const {bList, setBList} = useContext(BusinessListContext);

  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBwtCo-JGWULMIKP1fojEaUIuLhxgt00QQ'
  })
  

  const {crtBusiness, setCrtBusiness} = useContext(CurrentBusinessContext);

  return (isLoaded && location) ? (
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={crtBusiness ? crtBusiness.location : { lat: Number(location.lat), lng: Number(location.lng) }}
          zoom={13}
      >
          { /* Child components, such as markers, info windows, etc. */}
          <>
              <MarkerF
                  position={{ lat: Number(location.lat), lng: Number(location.lng) }}
                  //@ts-ignore
                  icon={{ url: '/userMarker.png', scaledSize: { width: 50, height: 50 } }}
              >
              </MarkerF>
           {
            crtBusiness && 
               
                    <MarkerF
                        position={crtBusiness.location}
                        //@ts-ignore
                        icon={{ url: 'pinStore.png', scaledSize: { width: 40, height: 40 } }}
                        //@ts-ignore
                        label={crtBusiness.name}
                    >
                    </MarkerF>
            
            
           }
          </>
      </GoogleMap> 
  ) : <></>
}

export default GoogleMapComponent