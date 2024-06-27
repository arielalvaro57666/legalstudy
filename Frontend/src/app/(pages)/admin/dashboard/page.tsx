// import { Dashboard } from "@/app/_components/admin/dashboard/dashboard";
"use client"
import withAuth from "@/app/_components/admin/Auth/withAuth"
import WebSocketServiceContext from "@/app/_core/services/websocketService"
import { useContext, useEffect } from "react"



function Dashboard(){
    const websocket_service = useContext(WebSocketServiceContext)

    useEffect(()=>{
        websocket_service.SetSocket('ws://localhost:8088/ws/chat', "b2fe551c-048d-4b96-a6a2-b6c5b62b5693",()=>{})
    },[])

    return(
        <>
            <h1>hola</h1>

        </>
    )
}

export default withAuth(Dashboard)
