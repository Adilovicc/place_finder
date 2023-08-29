import {Dispatch, SetStateAction, createContext} from 'react'

interface Location{
    lat: String,
    lng: String,
}

interface Values{
    location: Location | null,
    setLocation: Dispatch<SetStateAction<Location | null>>
}

const UserLocationContext = createContext<any>(null);

export default UserLocationContext;