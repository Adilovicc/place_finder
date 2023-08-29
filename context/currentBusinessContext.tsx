import { FC, ReactNode, createContext, useState } from "react";


const CurrentBusinessContext = createContext<any>(null);

export default CurrentBusinessContext;


interface Props {
    children: ReactNode
}

interface Item{
    name: String,
    opening_hours: {open_now: boolean},
    vicinity: String,
    rating: number,
    reference: String,
    location:any
}

export const CurrentBusinessProvider: FC<Props> = ({children})=>{
    const [crtBusiness, setCrtBusiness] = useState<Item | null>(null);
    return(
        <CurrentBusinessContext.Provider value={{crtBusiness, setCrtBusiness}}>
            {children}
        </CurrentBusinessContext.Provider>
    )
}