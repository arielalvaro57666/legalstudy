
import { createContext } from "react"
import { TSocketMessageHandler } from "../interfaces/core.interface"
import { IMessage } from "@/app/_components/chat/interfaces/chat.interface"

class WebSocketService{

    websocket: WebSocket | null = null
    messageHandler: TSocketMessageHandler | null = null 
    
    SetSocket(url:string, room_uuid:string, message_handler: TSocketMessageHandler){
        
        this.websocket = new WebSocket(`${url}/${room_uuid}/`)

        this.websocket.onopen = this.socketOnOpen
        this.websocket.onmessage = this.socketOnMessage
        this.websocket.onerror = this.socketOnError
        this.websocket.onclose = this.socketOnClose
        
        this.messageHandler = message_handler

    }

    // Make send data method 
    socketSendData = (message: IMessage) => {
        let data = JSON.stringify(message)
        this.websocket?.send(data)
    }
    
    socketOnOpen = (response: Event) => {
        // Make context state to the root and make the chat appear in case of success
    }

    socketOnMessage = (response: MessageEvent) => {
        let data = JSON.parse(response.data) 
        console.log(data)
        this.messageHandler!(data.message)
    }

    socketOnClose = (response: CloseEvent) => {
        
    }

    socketOnError = (response: Event) => {
    
    }
}

const WebSocketServiceContext = createContext(new WebSocketService())
export default WebSocketServiceContext