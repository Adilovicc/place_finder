import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL='https://maps.googleapis.com/maps/api/place'




export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try{
        
        const response=await axios(BASE_URL+
            "/textsearch/json"+
            "?location="+req.query.lat+","+req.query.lng+
            "&rankby=distance"+
            "&query="+req.query.searchtext+
            "&key="+process.env.REACT_APP_GOOGLE_API_KEY);

        const data=response.data;
        res.status(200).json(data);
    }catch(error)
    {
        console.error(error)
        res.status(500).json({error:error});
    }
}