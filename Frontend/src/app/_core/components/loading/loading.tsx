import { useEffect } from "react"

export function Loading(){


    return (
        <div className=" h-full w-full opacity-70 bg-black flex justify-center items-center z-50">

            <div
            className=" h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
            
            </div>
        </div>
    )
}