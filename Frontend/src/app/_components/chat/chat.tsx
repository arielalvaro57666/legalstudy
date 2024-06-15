'use client'
import React, { KeyboardEvent, useContext, useEffect, useRef, useState } from "react"
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import { BiSend } from "react-icons/bi";
import { Message, MessageData } from "./interfaces/chat.interface";
import DataServiceContext from "@/app/_core/services/dataService";
import { Socket } from "dgram";
import { JsxElement } from "typescript";
import { messageType } from "./enums/chat.enum";
import { ComponentMap } from "@/app/_core/component-map/component-map";
import WebSocketServiceContext from "@/app/_core/services/websocketService";



export default function Chat(){

    const data_service = useContext(DataServiceContext)
    const websocket_service = useContext(WebSocketServiceContext)
    
    const inputMessageRef = useRef<HTMLInputElement>(null)
    
    const [open, setOpen] = useState<boolean>(false)

    const [Messages, setMessages] = useState<(JSX.Element | null)[]>([]);


    useEffect(() => {

        initializeWebSocket()

    },[])
    
    //Functions
    const initializeWebSocket = () => {
        const url: string = `${data_service.ws_backend}/socket`

        websocket_service.SetSocket(url, generateMessage)

    }    

    const generateMessage = (message: MessageData) => {
        
        
        let messageElem: JSX.Element | null = null

        if (message.from === messageType.Admin){
            messageElem = <AdmingMsg text={message.text}/>
        }

        if (message.from === messageType.Client){
            messageElem = <ClientMsg text={message.text}/>
        }
        
        setMessages( prevMessages => [...prevMessages, messageElem])
    }
    
    const sendMessage = (text: string) => {

        let message: Message = {
            message:{
                from: messageType.Client,
                text: text
            }

        }

        websocket_service.socketSendData(message)
    }


    //Events


    const handleInput = () => {

        let text  = inputMessageRef.current!.value

        text !== "" ? sendMessage(inputMessageRef.current!.value) : inputMessageRef.current!.value = ''

    }



    return(
        <section className="fixed bottom-0 z-50 w-full lg:w-[30rem] lg:right-3">

            {/* Head */}
            <header className={`${open ? 'h-20' : 'h-10'} w-full bg-stone-900 flex items-center p-7 gap-4 relative`}>
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
            <main className={`w-full ${open ? 'h-[30rem]': 'hidden'} bg-zinc-800 p-4 overflow-scroll`}>
                <ComponentMap components={Messages}/>
                
            </main>


            <footer className={`w-full bg-zinc-800 flex items-center ${open ? 'h-full': 'hidden'}`}>
                <input type="text" className="w-[90%] h-full bg-zinc-800 text-white opacity-80 text-lg border-2 border-zinc-900 px-2" ref={inputMessageRef} 
                onKeyDown={(e)=>{ if (e.key === "Enter"){ handleInput() }
                }}/>

                <div className="w-[10%] h-full bg-slate-600 flex justify-center items-center cursor-pointer" onClick={handleInput} >
                    
                    <BiSend className=" text-stone-800 h-7 w-7"/>
                </div>

  
            </footer>



        </section>

    )
}


function AdmingMsg(message: MessageData){
    return(
        <> 
            <div className="flex w-2/3 justify-start mb-6 text-white break-all">
                <p className="p-2 bg-zinc-900 rounded-md opacity-80 text-wrap">{message.text}</p>
            </div>   
        </>
    )
}
function ClientMsg(message: MessageData){
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
