import {FC, ReactNode, createContext, useState} from 'react'


const BusinessListContext = createContext<any>(null);

export default BusinessListContext;

interface Item{
    name: String,
    opening_hours: {open_now: boolean} | String,
    vicinity: String,
    rating: number,
    reference: String,
    icon: String,
    location: any 
}

interface Props {
    children:ReactNode
}

export const BusinessListProvider:FC<Props> = ({children}) => {
    const [bList, setBList] = useState<Item[]>([]);

    return(
        <BusinessListContext.Provider value={{bList,setBList}}>
            {children}
        </BusinessListContext.Provider>
    )
}