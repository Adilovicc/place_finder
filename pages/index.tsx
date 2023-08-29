import BusinessList from "../components/ListComp/BusinessList"
import Categories from "../components/ListComp/Categories"
import SearchBar from "../components/ListComp/SearchBar"
import Sidebar from "../components/Sidebar"
import GoogleMapComponent from "../components/MapComp/GoogleMap"
import DistanceIndicator from "../components/MapComp/DistanceIndicator"
import google_api from "../providerApis"

export default function Home(){
      console.log("API JE: ",google_api);
      return(
        <div className="w-full min-h-screen relative flex bg-[#EEEEEE]">
            <Sidebar></Sidebar>
            <div className="grid grid-cols-1  md:grid-cols-2 px-6 md:px-10 w-full py-10 gap-8 ">

                {/* Business list */}
                <div className="mb-[120px] md:mb-0">
                   <SearchBar></SearchBar>
                   <Categories></Categories>
                   <BusinessList></BusinessList>
                </div>

                {/* Google Map */}
                <div className="order-first md:order-last">
                     <GoogleMapComponent></GoogleMapComponent>
                     <DistanceIndicator></DistanceIndicator>
                </div>
            </div>
        </div>
      )
}