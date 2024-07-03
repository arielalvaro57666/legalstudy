"use client"
import DataServiceContext from "@/app/_core/services/dataService"
import httpRequestContext from "@/app/_core/services/httpRequest"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { GiInjustice } from "react-icons/gi";
import Options from "./options";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

export default function Sidebar(){
    


    const [open, setOpen] = useState(false)

    const handleSidebar = () => {
        setOpen(!open)
    }

    if(open == false){
        return <TbLayoutSidebarLeftExpandFilled className="fixed w-10 h-10 text-white opacity-60 cursor-pointer top-2 left-2" onClick={handleSidebar}/>
    }

    return (
        <aside className="fixed side-appear h-full w-3/5 p-4 gap-4 lg:w-[16%] bg-sky-950 flex flex-col lg:gap-10 z-50 items-center lg:p-10">
            <TbLayoutSidebarLeftCollapseFilled className="w-10 h-10 text-white opacity-60 cursor-pointer" onClick={handleSidebar}/>
            <GiInjustice className="w-12 h-12 lg:w-24 md:h-24 text-white"/>
            <span className="w-full h-0.5 lg:h-0.5 bg-white"></span>

            <section className="w-full">
                <Options/>
            </section>

        </aside>
    )
}

