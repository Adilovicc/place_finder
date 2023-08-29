import axios from 'axios'
import baseUrl from '../BaseUrl';

const getNearbyPlaces = (category:String, lng:String, lat:String) => axios({
    method:'GET',
    url:`${baseUrl}api/getNearbyPlaces?category=${category}&lng=${lng}&lat=${lat}`
})

export default {
    getNearbyPlaces
}