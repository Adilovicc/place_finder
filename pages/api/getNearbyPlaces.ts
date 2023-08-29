import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import baseUrl from '../../NearbyPlacesBaseUrl'

export default async function getNearbyPlaces(req:NextApiRequest,res:NextApiResponse){
      
   try {
       const response = await axios(baseUrl +
        '/nearbysearch/json?fields=formatted_address,name,rating,opening_hours,geometry,photos&type=' +
        req.query.category + '&location=' + req.query.lng + ',' + req.query.lat + '&radius=5000&key='
        + process.env.MAPS_API);
      
       return res.status(200).json(response.data);

   } catch (error) {
       console.log(error);
       return res.status(500).json({err:error});
   }
    
}