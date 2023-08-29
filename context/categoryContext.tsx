import { createContext, ReactNode, useState, FC } from "react";


const CategoryContext = createContext<any>({});
export default CategoryContext;

interface Props {
    children: ReactNode
}

export const CategoryContextProvider: FC<Props> = ({children})=>{
    const [category, setCategory] = useState('gas_station');

    return(
        <CategoryContext.Provider value={{category, setCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}