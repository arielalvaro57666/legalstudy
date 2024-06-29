// import { Dashboard } from "@/app/_components/admin/dashboard/dashboard";
"use client"
import withAuth from "@/app/_components/admin/Auth/withAuth"
import ChatPanel from "@/app/_components/admin/chat/chat-panel"
import Sidebar from "@/app/_components/admin/sidebar/sidebar"
import WebSocketServiceContext from "@/app/_core/services/websocketService"
import { useContext, useEffect, useState } from "react"



function Dashboard(){


    return(
        <section className="bg-[#222] w-screen h-screen md:grid md:grid-cols-7 md:grid-rows-1 md:gap-3">
            <Sidebar/>
            
            <ChatPanel/>

        </section>
    )
}

export default withAuth(Dashboard)
