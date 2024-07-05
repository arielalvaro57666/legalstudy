import DataServiceContext from "@/app/_core/services/dataService"
import httpRequestContext from "@/app/_core/services/httpRequest"
import { data } from "autoprefixer"
import { useContext, useEffect, useState } from "react"
import {IChatsCount, IStats, ITodayVisits, ITotalVisits } from "./interfaces/stats.interface"
import { stat } from "fs"
import { HTTPCodeEnum, HTTPMethodEnum } from "@/app/_core/enums/core.enum"
import { IHTTPresponse } from "@/app/_core/interfaces/core.interface"


export default function Values(){
    const api_service = useContext(httpRequestContext)
    const data_service = useContext(DataServiceContext)

    const [stats, setStats] = useState<IStats | undefined>()

    
    useEffect(()=>{
        getStats()
    },[])
    
    const getTodayVisits = async () => {
        const url = data_service.setUrl("register_retrieve")
        const options = api_service.generateOptions(url, {})
        const response: IHTTPresponse<ITodayVisits> = await api_service.request<ITodayVisits>(HTTPMethodEnum.GET, options, true)

        if (response.status != HTTPCodeEnum.OK){
            return
        }

        return response.data
    }   
    
    const getTotalVisits = async () => {
        const url = data_service.setUrl("register_retrieve_total")
        const options = api_service.generateOptions(url, {})
        const response: IHTTPresponse<ITotalVisits> = await api_service.request<ITotalVisits>(HTTPMethodEnum.GET, options, true)

        if (response.status != HTTPCodeEnum.OK){
            return
        }

        return response.data
    }

    const getChatsCount = async () => {
        const url = data_service.setUrl("chat_count")
        const options = api_service.generateOptions(url, {})
        const response: IHTTPresponse<IChatsCount> = await api_service.request<IChatsCount>(HTTPMethodEnum.GET, options, true)

        if (response.status != HTTPCodeEnum.OK){
            return
        }

        return response.data
    }

    const getStats = async () => {
        
        const [chatsCount, todayVisits, totalVisits] = await Promise.all([getChatsCount(), getTodayVisits(), getTotalVisits()])
        
        const stats: IStats = {
            chatsCount: chatsCount,
            todayVisits: todayVisits,
            totalVisits: totalVisits
        }

        setStats(stats)

    }



    return(
        <section className="w-full h-full p-4 overflow-hidden flex flex-col gap-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">

            
            <section className="flex flex-col gap-2 flex-grow">

                <div className="w-full h-full flex flex-col justify-around items-center border-4 border-zinc-800 text-center">
                    <div className="bg-slate-500 w-full h-full flex justify-center items-center ">
                        <h2 className="text-white text-6xl">{stats?.chatsCount != undefined ? stats.chatsCount.chats_on : "-"}</h2>
                    </div>
                    <div className="w-full h-0.5 opacity-80 bg-white"></div>
                    <div className="bg-slate-700 w-full h-full flex justify-center items-center">
                        <h2 className="text-white text-3xl font-medium font-sans uppercase">Chats Conectados</h2>
                    </div>       
                </div>

                <div className="w-full h-full flex flex-col justify-around items-center border-4 border-zinc-800 text-center">
                    <div className="bg-slate-500 w-full h-full flex justify-center items-center ">
                        <h2 className="text-white text-6xl">{stats?.chatsCount != undefined ? stats.chatsCount.chats_off : "-"}</h2>
                    </div>
                    <div className="w-full h-0.5 opacity-80 bg-white"></div>
                    <div className="bg-slate-700 w-full h-full flex justify-center items-center">
                        <h2 className="text-white text-3xl font-medium font-sans uppercase">Chats Guardados</h2>
                    </div>       
                </div>

                <div className="w-full h-full flex flex-col justify-around items-center border-4 border-zinc-800 text-center">
                    <div className="bg-slate-500 w-full h-full flex justify-center items-center ">
                        <h2 className="text-white text-6xl">{stats?.todayVisits != undefined ? stats.todayVisits.visited : "-"}</h2>
                    </div>
                    <div className="w-full h-0.5 opacity-80 bg-white"></div>
                    <div className="bg-slate-700 w-full h-full flex justify-center items-center">
                        <h2 className="text-white text-3xl font-medium font-sans uppercase">Visitas de Hoy</h2>
                    </div>       
                </div>
                <div className="w-full h-full flex flex-col justify-around items-center border-4 border-zinc-800 text-center">
                    <div className="bg-slate-500 w-full h-full flex justify-center items-center ">
                        <h2 className="text-white text-6xl">{stats?.totalVisits != undefined ? stats.totalVisits.total : "-"}</h2>
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