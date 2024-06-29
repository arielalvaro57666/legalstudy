import { useContext, useEffect, useState } from "react";
import Chat from "./chat";
import DataServiceContext from "@/app/_core/services/dataService";
import httpRequestContext from "@/app/_core/services/httpRequest";
import { IHttpOptions } from "@/app/_core/interfaces/core.interface";
import { data } from "autoprefixer";
import { IChat, IClient } from "./interfaces/chat.interface";
import { ChatStatusEnum } from "./enums/chat.enum";
import { Loading } from "@/app/_core/components/loading/loading";


export default function ChatPanel(){

    const data_service = useContext(DataServiceContext)
    const api_service = useContext(httpRequestContext)
    const url = data_service.setUrl('chat_list')
    const [loading, setLoading] = useState(true)
    const [chatsOn, setChatsOn] = useState<IChat[]>([])
    const [chatsOff, setChatsOff] = useState<IChat[]>([])

    useEffect(()=>{
        getChats()
    },[])


    const getChats = async () => {
  
        const options: IHttpOptions = api_service.generateOptions(url, {})

        const [status,response] = await api_service.request('GET',options) 

        if(status != 200){
            return
        }

        filterChats(response)

    }
    
    const filterChats = (chats: IChat[]) => {
        
        let chats_on: IChat[] = chats.filter((chat) => chat.status === ChatStatusEnum.Open)
        let chats_off: IChat[] =  chats.filter((chat) => chat.status === ChatStatusEnum.Closed)

        console.log(chats_on, chats_off)

        setChatsOn(chats_on)
        setChatsOff(chats_off)

        setLoading(false)
    }

    if (loading){
        return <Loading/>
    }

    return (
        <section className="w-full h-full grid grid-rows-2 gap-4 p-9">

            <section className="w-full h-full ">
                
                <section className=" w-full h-full border-8 p-4 flex flex-col">
                    <h2 className="text-center text-white text-3xl">Conectados</h2>
                    <section className="w-full h-full border-2 cursor-pointer border-red-600 overflow-scroll">
                        
                        <div className="w-full h-12 border-2 flex items-center justify-center">
                            <p className="text-white text-center">Cliente: ariel Telefono: 3512297044</p>
                        </div>
           
                    </section>
                </section>

            </section>
            <section className="w-full h-full ">
                
                <section className=" w-full h-full border-8 p-4 flex flex-col">
                    <h2 className="text-center text-white text-3xl">Desconectados</h2>
                    <section className="w-full h-full border-2 border-red-600 overflow-scroll">
                        
  
                        {
                            chatsOff.map((chat, index)=> (
                                <div className="w-full h-12 border-2 flex items-center justify-center" key={index}>
                                    <p className="text-white text-center">Cliente: {chat.client.name} Telefono: {chat.client.cellphone}</p>
                                </div>
                            ))
                        }
                        
                    </section>
                </section>

            </section>
            
        </section>
    )
}

function ChatRow({name, cellphone}: IClient){

    <div className="w-full h-12 border-2 flex items-center justify-center">
        <p className="text-white text-center">Cliente: {name} Telefono: {cellphone}</p>
    </div>
}