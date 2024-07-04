"use client"
import withAuth from "@/app/_components/admin/Auth/withAuth";
import ChatPanel from "@/app/_components/admin/chat/chat-panel";

import Chat from "@/app/_components/chat/chat";
import { UserTypeEnum } from "@/app/_components/chat/enums/chat.enum";
import { IChat, IChatData } from "@/app/_components/chat/interfaces/chat.interface";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
function ChatAdmin(){
 
    const [chatData, setChatData] = useState<IChatData | undefined>()

    const setChat = (chat: IChat) => {
        let chat_data: IChatData = {
            roomID: chat.roomID,
            status: chat.status,
            client_data:{
                name: chat.client.name,
                cellphone: chat.client.cellphone
            }
        }

        setChatData(chat_data)
    }

    const closeChat = () => {
        setChatData(undefined)
    }

    return(
        
          
            
        <section className="w-full h-full lg:grid lg:grid-cols-2 lg:p-10 "> 

            <section className="lg:w-full lg:relative lg:h-full lg:border-4 lg:border-r-0 lg:flex lg:justify-center lg:items-center bg-slate-500 lg:min-h-0 lg:overflow-hidden">
                
                {chatData != undefined ? 
                (<>
                    <IoCloseCircleSharp className="lg:w-10 lg:h-10 absolute lg:text-red-600 lg:z-50 cursor-pointer top-2 right-0 " onClick={closeChat}/>
                    <Chat key={chatData.roomID} actual_user={UserTypeEnum.Admin} chat_data={chatData}/>
                </>) : 
                (<div className="hidden lg:block"><p className="text-white text-5xl">Seleccione un chat</p></div>)
                }
            </section>

            
            <ChatPanel chatHandler={setChat}/>

        </section>
  

      
    )
}

export default withAuth(ChatAdmin)