'use client'
import React, { KeyboardEvent, useContext, useEffect, useRef, useState } from "react"
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import { BiSend } from "react-icons/bi";
import {IChat, IChatProp, IMessage, IMessageData, IMessageProp} from "./interfaces/chat.interface";
import DataServiceContext from "@/app/_core/services/dataService";
import { Socket } from "dgram";
import { JsxElement } from "typescript";
import { MessageTypeEnum, MessageOriginEnum, UserTypeEnum } from "./enums/chat.enum";
import { ComponentMap } from "@/app/_core/component-map/component-map";
import WebSocketServiceContext from "@/app/_core/services/websocketService";
import { v4 as uuidv4 } from "uuid"
import "./chat.css"
import httpRequestContext from "@/app/_core/services/httpRequest";
import { IHTTPdetail, IHTTPresponse, IHttpOptions } from "@/app/_core/interfaces/core.interface";
import chatServiceContext from "./services/chat.service";
import { WebsocketTypeEnum } from "@/app/_core/enums/core.enum";
import { FaUserCircle } from "react-icons/fa";
import { ChatStatusEnum } from "../admin/chat/enums/chat.enum";
export default function Chat({actual_user, chat_data}: IChatProp  ){
    const data_service = useContext(DataServiceContext)
    const websocket_service = useContext(WebSocketServiceContext)
    const api_service = useContext(httpRequestContext)
  

    const create_url = data_service.setUrl("chat_create")
    const ws_url = data_service.setUrlws("chat")

    const mainRef = useRef<HTMLElement>(null)
    const inputMessageRef = useRef<HTMLInputElement>(null)
    
    const [open, setOpen] = useState<boolean>(false)
    const [hasDisconnect, setHasDisconnected] = useState(false)
    const [messages, setmessages] = useState<(JSX.Element | null)[]>([]);
    const [chatOpen, setChatOpen] = useState<boolean>(false)
   

    useEffect(()=>{
        // Scroll down if new message or open chat
        if(mainRef.current){
            mainRef.current!.scrollTop = mainRef.current!.scrollHeight;
        }
        
    },[messages, open])

    useEffect(() => {
        // Set open depending on screen width
        if (innerWidth >= 1024 || actual_user == UserTypeEnum.Admin){
            setOpen(true)
        }

        if(actual_user == UserTypeEnum.Admin && chat_data != undefined){
            
            getMessages()
            initializeWebSocket(chat_data.roomID)
            setHasDisconnected(chat_data.status === ChatStatusEnum.Closed)

        }else{createChat()}

        return () => {
            websocket_service.closeSocket(WebsocketTypeEnum.Chat)
        }

    },[])

    
    //Functions
    const initializeWebSocket = (uuid: string) => {
        
        const uuid_url = `${ws_url}/${uuid}/`

        websocket_service.SetSocket(uuid_url, WebsocketTypeEnum.Chat, handleMessage)

        setChatOpen(true)
    }    


    const  createChat = async () => {

        const options: IHttpOptions = api_service.generateOptions(create_url, {}) 

        const response: IHTTPresponse<IChat> = await api_service.request<IChat>("POST", options)
        console.log(response)
        if (response.status != 201){
            return null
        }
        
        if(response.data){
            initializeWebSocket(response.data.roomID)
        }
        
    }

    const handleMessage = (message: IMessage) => {
        console.log(message)
        if(message.data.user_type != actual_user){

            if (message.data.message_type == MessageTypeEnum.Notification){
                setHasDisconnected(true)
            }
            generateMessage(MessageOriginEnum.Incoming, message.data)
     
        
            
        }

    }
    
    const getMessages = async () => {
        const get_url = data_service.setUrl(`chat_retrieve/${chat_data?.roomID}`)

        const options: IHttpOptions = api_service.generateOptions(get_url, {})

        const response: IHTTPresponse<IChat> = await api_service.request<IChat>('GET',options, true) 

        
        if(response.status != 200){
            return
        }
        if(response.data){
            restoreMessages(response.data.messages)
        }
        

    }

    const restoreMessages = (messages: IMessageData[]) => {
        let stored_messagesElem: JSX.Element[] = []


        for (let message of messages){
            let origin = MessageOriginEnum.Incoming 
            
            if(message.user_type == UserTypeEnum.Admin){
                origin = MessageOriginEnum.Outgoing
            }

            let messageElem: JSX.Element = <Message origin={origin} message={message}/>
            
            stored_messagesElem.push(messageElem)
        }

        setmessages(stored_messagesElem)
    }

    const generateMessage = (messageOrigin: string, message: IMessageData) => {
   
        
        let messageElem: JSX.Element | null = null
        //console.log("####",messageOrigin, data)
        // Genere only if it's not my user
        if(message.message_type === MessageTypeEnum.Chat){
            messageElem = <Message origin={messageOrigin} message={message}/>
        }
        
        if(message.message_type === MessageTypeEnum.Notification){
            messageElem = <Notification origin={messageOrigin} message={message}/>
            
        }
        
        
        setmessages( prevmessages => [...prevmessages, messageElem])
    }
    
    const sendMessage = (text: string) => {

        let message: IMessageData = {
            user_type: actual_user,
            message_type: MessageTypeEnum.Chat,
            text: text
        }

        generateMessage(MessageOriginEnum.Outgoing ,message)
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

    if(actual_user === UserTypeEnum.Admin && chatOpen){
        return(
            <section className={` ${open && innerWidth < 1024 ? 'slide-up h-full': 'h-auto'} w-full z-40 fixed lg:static bottom-0 lg:right-3 lg:h-full lg:w-full lg:min-h`}>

                {/* Head */}
                <header className={` ${open && innerWidth < 1024 ? "h-[10%]" : "h-10"} w-full bg-slate-500 flex items-center p-7 gap-4 lg:h-[10%] `}>

                    <section className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-red-50">
                            <FaUserCircle className=" w-full h-full"/>
                        </div>
                        <div>
                            <h3 className="text-white text-xl">Cliente: Ariel Alvaro</h3>
                            <h3 className="text-white text-xl">Telefono: 3512297044</h3>
                        </div>
                    </section>
                    <span className={`h-3 w-3 rounded-full ${!hasDisconnect ? "bg-green-500" : "bg-red-600" }  opacity-75`}></span>
                    
                    <div className="cursor-pointer absolute right-6" onClick={() => {setOpen(!open)}}>   
                        { innerWidth < 1024 ?
                        <div>
                            {open ? <IoIosArrowDown className="h-8 w-8 text-white "/> : <IoIosArrowUp className="h-8 w-8 text-white"/>}
                        </div>: null}
                    </div>
                    
                    
                </header>
                {/* Body */}
                
                {open ?
                <main className={`w-full lg:h-[80%] h-[85%] bg-slate-700 p-4 overflow-y-auto `} ref={mainRef}>
                    <ComponentMap components={messages}/>
                    
                </main> : null}

                {open ?
                <footer className={`h-[5%] w-full bg-slate-700 flex items-center lg:h-[10%]`}>
                    
                    {chat_data?.status != ChatStatusEnum.Closed && ! hasDisconnect ? 
                        (<>
                            <input type="text" className="w-[90%] h-full bg-slate-700 text-white opacity-80 text-lg border-2 border-zinc-900 px-2" ref={inputMessageRef} 
                            onKeyDown={(e)=>{ if (e.key === "Enter"){ handleInput() }
                            }}/>
                        
                            <div className="w-[10%] h-full bg-slate-600 flex justify-center items-center cursor-pointer" onClick={handleInput} >
                                
                                <BiSend className=" text-stone-800 h-7 w-7"/>
                            </div>
                        </>)
                    :null}
                    


    
                </footer>: null}



            </section>

        )
    }
        
    if(chatOpen){
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

function Message({origin, message}: IMessageProp){

    if(origin === MessageOriginEnum.Incoming){
        return(
            <> 
                <div className="flex w-2/3 justify-start mb-6 text-white break-all">
                    <p className="p-2 bg-zinc-900 rounded-md opacity-80 text-wrap">{message.text}</p>
                </div>   
            </>
        )
    }

    if(origin === MessageOriginEnum.Outgoing){
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

    return null
}

function Notification({origin, message}: IMessageProp){
    return(
        <> 
            
            <p className="w-full text-center p-2 text-red-500 rounded-md opacity-80 text-wrap">{message.text}</p>
          
        </>
    )
}

