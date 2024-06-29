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
        return <TbLayoutSidebarLeftExpandFilled className="fixed w-10 h-10 text-white opacity-60 cursor-pointer" onClick={handleSidebar}/>
    }

    return (
        <aside className="fixed side-appear h-full w-3/5 p-4 gap-4 md:w-full md:h-full bg-sky-950 flex flex-col md:gap-10 items-center md:p-10">
            <TbLayoutSidebarLeftCollapseFilled className="w-10 h-10 text-white opacity-60 cursor-pointer" onClick={handleSidebar}/>
            <GiInjustice className="w-12 h-12 md:w-40 md:h-40 "/>
            <span className="w-full h-0.5 md:h-2 bg-black"></span>

            <section className="w-full">
                <Options/>
            </section>

        </aside>
    )
}

