'use client'
import { KeyboardEvent, useEffect, useRef, useState } from "react"
import { TextField } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import { BiSend } from "react-icons/bi";
import { Message, MessageProp } from "./interfaces/chat.interface";

export default function Chat(){


    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = () => {

    }
    const mes: Message = {
        text:'rappp!!!'
    }
    return(
        <section className="fixed bottom-0 z-50 w-full">

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

                
            </main>


            <footer className={`w-full bg-zinc-800 flex items-center ${open ? 'h-full': 'hidden'}`}>
                <input type="text" className="w-[90%] h-full bg-zinc-800 text-white opacity-80 text-lg border-2 border-zinc-900 px-2"/>

                <div className="w-[10%] h-full bg-slate-600 flex justify-center items-center cursor-pointer">
                    <BiSend className=" text-stone-800 h-7 w-7"/>
                </div>

  
            </footer>



        </section>

    )
}


function IncomingMsg(message: Message){
    return(
        <> 
            <div className="flex w-2/3 justify-start mb-6 text-white break-all">
                <p className="p-2 bg-zinc-900 rounded-md opacity-80 text-wrap">{message.text}</p>
            </div>   
        </>
    )
}
function ClientMsg(message: Message){
    return(
        <>
            <div className="w-full flex justify-end">
                <div className="flex w-2/3 justify-end mb-6 text-white">
                    <p className="p-2 bg-zinc-900 inline-block rounded-md opacity-80">{message.text}</p>
                </div>
            </div>
        </>
    )
}
