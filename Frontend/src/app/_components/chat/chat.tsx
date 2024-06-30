'use client'
import React, { KeyboardEvent, useContext, useEffect, useRef, useState } from "react"
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import { BiSend } from "react-icons/bi";
import {IChat, IMessage, IMessageData} from "./interfaces/chat.interface";
import DataServiceContext from "@/app/_core/services/dataService";
import { Socket } from "dgram";
import { JsxElement } from "typescript";
import { messageType } from "./enums/chat.enum";
import { ComponentMap } from "@/app/_core/component-map/component-map";
import WebSocketServiceContext from "@/app/_core/services/websocketService";
import { v4 as uuidv4 } from "uuid"
import "./chat.css"
import httpRequestContext from "@/app/_core/services/httpRequest";
import { IHttpOptions } from "@/app/_core/interfaces/core.interface";
import chatServiceContext from "./services/chat.service";
import { WebsocketTypeEnum } from "@/app/_core/enums/core.enum";

export default function Chat(){
    const data_service = useContext(DataServiceContext)
    const websocket_service = useContext(WebSocketServiceContext)
    const api_service = useContext(httpRequestContext)
    const chat_service = useContext(chatServiceContext)

    const url = data_service.setUrl("chat_create")
    const ws_url = data_service.setUrlws("chat")

    const mainRef = useRef<HTMLElement>(null)
    const inputMessageRef = useRef<HTMLInputElement>(null)
    
    const [open, setOpen] = useState<boolean>(false)

    const [messages, setmessages] = useState<(JSX.Element | null)[]>([]);
    const [chatCreated, setChatCreated] = useState<boolean>(false)

    useEffect(()=>{
        // Scroll down if new message or open chat
        if(mainRef.current){
            mainRef.current!.scrollTop = mainRef.current!.scrollHeight;
        }
        
    },[messages, open])

    useEffect(() => {
        // Set open depending on screen width
        if (innerWidth >= 1024 ){
            setOpen(true)
        }

    
        createChat()
        
    },[])
    
    //Functions
    const initializeWebSocket = (uuid: string) => {

        const uuid_url = `${ws_url}/${uuid}/`

        websocket_service.SetSocket(uuid_url, WebsocketTypeEnum.Chat, generateMessage)
    }    


    const  createChat = async () => {


        const options: IHttpOptions = api_service.generateOptions(url, {}) 

        const [status, response] = await api_service.request("POST", options)
        console.log(response)
        if (status != 201){
            return null
        }
        setChatCreated(true)
        initializeWebSocket(response.roomID)
    }


    const generateMessage = (data: IMessageData) => {
   
        
        let messageElem: JSX.Element | null = null

        if (data.user_type === messageType.Admin){
            messageElem = <AdmingMsg text={data.text}/>
        }

        if (data.user_type === messageType.AnonymousUser){
            messageElem = <ClientMsg text={data.text}/>
        }
        
        setmessages( prevmessages => [...prevmessages, messageElem])
    }
    
    const sendMessage = (text: string) => {

        let message: IMessageData = {
            text: text
        }

        websocket_service.socketSendData(WebsocketTypeEnum.Chat,message)
    }


    //Events


    const handleInput = () => {
        
        let text  = inputMessageRef.current!.value

        if (text !== ""){
            sendMessage(inputMessageRef.current!.value)
        }

        inputMessageRef.current!.value = ''
        
        

    }

        
    if(chatCreated){
        return(
            <section className={` ${open ? 'slide-up h-full': 'h-auto'} w-full z-50 fixed bottom-0 lg:right-3 lg:w-[27rem] lg:h-auto `}>

                {/* Head */}
                <header className={` ${open ? "h-[10%]" : "h-10"} w-full bg-stone-900 flex items-center p-7 gap-4 lg:h-12 `}>
                    <div className="w-10 h-10 rounded-full bg-red-50">
                        <img></img>
                    </div>
                    <h3 className="text-white text-xl">Abogado en linea</h3>
                    <span className="h-3 w-3 rounded-full bg-green-500 opacity-75"></span>
                    
                    <div className="cursor-pointer absolute right-6" onClick={() => {setOpen(!open)}}>   

                        {open ? <IoIosArrowDown className="h-8 w-8 text-white "/> : <IoIosArrowUp className="h-8 w-8 text-white"/>}

                    </div>
                    
                    
                </header>
                {/* Body */}
                
                {open ?
                <main className={`w-full lg:h-96 h-[85%] bg-zinc-800 p-4 overflow-scroll`} ref={mainRef}>
                    <ComponentMap components={messages}/>
                    
                </main> : null}

                {open ?
                <footer className={`h-[5%] w-full bg-zinc-800 flex items-center lg:h-9`}>
                    <input type="text" className="w-[90%] h-full bg-zinc-800 text-white opacity-80 text-lg border-2 border-zinc-900 px-2" ref={inputMessageRef} 
                    onKeyDown={(e)=>{ if (e.key === "Enter"){ handleInput() }
                    }}/>

                    <div className="w-[10%] h-full bg-slate-600 flex justify-center items-center cursor-pointer" onClick={handleInput} >
                        
                        <BiSend className=" text-stone-800 h-7 w-7"/>
                    </div>

    
                </footer>: null}



            </section>

        )
    }

    return null
}


function AdmingMsg(message: IMessageData){
    return(
        <> 
            <div className="flex w-2/3 justify-start mb-6 text-white break-all">
                <p className="p-2 bg-zinc-900 rounded-md opacity-80 text-wrap">{message.text}</p>
            </div>   
        </>
    )
}
function ClientMsg(message: IMessageData){
    return(
        <>
            <div className="w-full flex justify-end">
                <div className="flex w-2/3 justify-end mb-6 text-white break-all">
                    <p className="p-2 bg-zinc-900 inline-block rounded-md opacity-80">{message.text}</p>
                </div>
            </div>
        </>
    )
}
