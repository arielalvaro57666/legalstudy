import { useContext, useEffect, useState } from "react";

import DataServiceContext from "@/app/_core/services/dataService";
import httpRequestContext from "@/app/_core/services/httpRequest";
import { IHTTPresponse, IHttpOptions } from "@/app/_core/interfaces/core.interface";

import { IChatPanelProp, IClient } from "./interfaces/chat.interface";
import { ChatStatusEnum } from "./enums/chat.enum";
import { Loading } from "@/app/_core/components/loading/loading";
import WebSocketServiceContext from "@/app/_core/services/websocketService";
import { WebsocketTypeEnum } from "@/app/_core/enums/core.enum";


import { IChat, IChatData } from "../../chat/interfaces/chat.interface";


export default function ChatPanel({chatHandler}: IChatPanelProp){

    const data_service = useContext(DataServiceContext)
    const api_service = useContext(httpRequestContext)
    const websocket_service = useContext(WebSocketServiceContext)

    const url = data_service.setUrl('chat_list')


    const [loading, setLoading] = useState(true)
    const [chatsOn, setChatsOn] = useState<IChat[]>([])
    const [chatsOff, setChatsOff] = useState<IChat[]>([])


    useEffect(()=>{
        getChats()
        connectAdmin()
        setLoading(false)
    },[])
    




    const connectAdmin = () => {
        const ws_url = data_service.setUrlws("admin/")
        websocket_service.SetSocket(ws_url, WebsocketTypeEnum.Admin, getChats)
    }


    const getChats = async () => {
  
        const options: IHttpOptions = api_service.generateOptions(url, {})

        const response: IHTTPresponse<IChat[]> = await api_service.request<IChat[]>('GET',options, true) 

        if(response.status != 200){
            return
        }
        if(response.data){
            filterChats(response.data)
        }
        

    }
    
    const filterChats = (chats: IChat[]) => {
        
        let chats_on: IChat[] = chats.filter((chat) => chat.status === ChatStatusEnum.Open)
        let chats_off: IChat[] =  chats.filter((chat) => chat.status === ChatStatusEnum.Closed)

        console.log(chats_off, chats_on)
        setChatsOn(chats_on)
        setChatsOff(chats_off)

    }



    // Channge this an put it on the individual sections
    if (loading){
        return <Loading/>
    }
    

    return (
 
           
        
        <section className="w-full h-full grid grid-rows-2 col-start-2 p-10 lg:p-0 lg:min-h-0">
            {/* {chatOpen ?
                <section className="fixed">
                    <Chat key={chatData?.roomID} actual_user={UserTypeEnum.Admin} chat_data={chatData}/>
                </section>
            :null} */}
            
            <section className="w-full h-full ">
                
                <section className=" w-full h-full border-8 lg:border-4 p-4 flex flex-col bg-slate-500">
                    <h2 className="text-center text-white text-3xl">Conectados</h2>
                    <section className="w-full h-full border-2 bg-slate-700 overflow-scroll">
                        

                        {chatsOn.length === 0 ? (
                                <p className="text-center text-red-500 text-2xl">No hay usuarios conectados</p>
                            ) :(
                                    chatsOn.map((chat, index)=> (
                                        <div className="w-full h-12 flex cursor-pointer items-center justify-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-gray-700" key={index} onClick={()=>{chatHandler(chat)}}>
                                            <p className="text-white text-center">Cliente: {chat.client.name} Telefono: {chat.client.cellphone}</p>
                                        </div>
                                    ))
                                )
                        }

                    </section>
                </section>

            </section>
            
            <section className="w-full h-full ">
                
                <section className=" w-full h-full border-8 lg:border-4 p-4 flex flex-col bg-slate-500">
                    <h2 className="text-center text-white text-3xl">Guardados</h2>
                    <section className="w-full h-full border-2 bg-slate-700 overflow-scroll">
                        

                        {chatsOff.length === 0 ? (
                                <p className="text-center text-red-500 text-2xl"> No hay chats guardados</p>
                            ) :(
                                    chatsOff.map((chat, index)=> (
                                        <div className="w-full h-12 flex cursor-pointer items-center justify-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-gray-700" key={index} onClick={()=>{chatHandler(chat)}}>
                                            <p className="text-white text-center">Cliente: {chat.client.name} Telefono: {chat.client.cellphone}</p>
                                        </div>
                                    ))
                                )
                        }

                    </section>
                </section>

            </section>
            
        </section>

    )
}
