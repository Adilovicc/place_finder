


export default function ShimmerItemElement(){
    return(
        <div className="w-full animate-pulse flex items-center p-1 bg-[#f9f7f782] border-b-[2px] border-gray-600/40 gap-3 ">
            <div className="w-[80px] h-[80px] rounded-lg bg-[#b5b3b3]">

            </div>
            <div className="flex-grow space-y-2">
                <div className="w-[100%] h-[22px] mb-3 bg-[#9b9a9a] rounded-md"> </div>
                <div className="w-[100%] flex  h-[15px] gap-4"> 
                     <div className="w-[60%]  h-[15px] bg-[#b5b3b3] rounded-md"> </div>
                     <div className="w-[40%]  h-[15px] bg-[#b5b3b3] rounded-md"> </div>
                </div>
                <div className="w-[100%]  h-[15px] bg-[#c8c6c6] rounded-md"> </div>
            </div>
        </div>
    )
}