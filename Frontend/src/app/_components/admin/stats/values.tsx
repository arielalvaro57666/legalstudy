import DataServiceContext from "@/app/_core/services/dataService"
import httpRequestContext from "@/app/_core/services/httpRequest"
import { data } from "autoprefixer"
import { useContext, useEffect, useState } from "react"
import { IStats } from "./interfaces/stats.interface"
import { stat } from "fs"

export default function Values(){
    const api_service = useContext(httpRequestContext)
    const data_service = useContext(DataServiceContext)

    const [stats, setStats] = useState<IStats | undefined>()

    useEffect(()=>{
        getStats()
    },[])
    

    

    const getStats = async () => {
        const visits_url = data_service.setUrl("register_retrieve")
        const chats_url = data_service.setUrl("chat_count")

        const visits_options = api_service.generateOptions(visits_url, {})
        const chats_options = api_service.generateOptions(chats_url, {})

        const visits_promise = api_service.request("GET", visits_options, true)
        const chats_count_promise = api_service.request("GET", chats_options, true)
  

        const [visits_response, chats_response] = await Promise.all([visits_promise, chats_count_promise])
        console.log(visits_response, chats_response)
        //if (visits_responses.status)
        // const url = data_service.setUrl("register_retrieve")
        // const options = api_service.generateOptions(url, {})
        // const [status, response] = await api_service.request("GET", options, true)
        
        // if(status != 200){
        //     console.log("")
        // }
        // setStats(response)
        // console.log(response)
    }
    
    if (stats == undefined){
        return null
    }

    return(
        <section className="w-full h-full p-4 overflow-hidden flex flex-col gap-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">

            
            <section className="flex flex-col gap-2 flex-grow">

                <div className="w-full h-full flex flex-col justify-around items-center border-4 border-zinc-800 text-center">
                    <div className="bg-slate-500 w-full h-full flex justify-center items-center ">
                        <h2 className="text-white text-6xl">12</h2>
                    </div>
                    <div className="w-full h-0.5 opacity-80 bg-white"></div>
                    <div className="bg-slate-700 w-full h-full flex justify-center items-center">
                        <h2 className="text-white text-3xl font-medium font-sans uppercase">Chats Conectados</h2>
                    </div>       
                </div>

                <div className="w-full h-full flex flex-col justify-around items-center border-4 border-zinc-800 text-center">
                    <div className="bg-slate-500 w-full h-full flex justify-center items-center ">
                        <h2 className="text-white text-6xl">12</h2>
                    </div>
                    <div className="w-full h-0.5 opacity-80 bg-white"></div>
                    <div className="bg-slate-700 w-full h-full flex justify-center items-center">
                        <h2 className="text-white text-3xl font-medium font-sans uppercase">Chats Guardados</h2>
                    </div>       
                </div>
                <div className="w-full h-full flex flex-col justify-around items-center border-4 border-zinc-800 text-center">
                    <div className="bg-slate-500 w-full h-full flex justify-center items-center ">
                        <h2 className="text-white text-6xl">12</h2>
                    </div>
                    <div className="w-full h-0.5 opacity-80 bg-white"></div>
                    <div className="bg-slate-700 w-full h-full flex justify-center items-center">
                        <h2 className="text-white text-3xl font-medium font-sans uppercase">Visitas de Hoy</h2>
                    </div>       
                </div>
                <div className="w-full h-full flex flex-col justify-around items-center border-4 border-zinc-800 text-center">
                    <div className="bg-slate-500 w-full h-full flex justify-center items-center ">
                        <h2 className="text-white text-6xl">12</h2>
                    </div>
                    <div className="w-full h-0.5 opacity-80 bg-white"></div>
                    <div className="bg-slate-700 w-full h-full flex justify-center items-center">
                        <h2 className="text-white text-3xl font-medium font-sans uppercase">Visitas totales</h2>
                    </div>       
                </div>
            </section>
        </section>
    )
}