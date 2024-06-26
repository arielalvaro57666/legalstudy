import { createContext } from "react"
import { TSocketMessageHandler } from "../interfaces/core.interface"
import { Message } from "@/app/_components/chat/interfaces/chat.interface"

class WebSocketService{

    Websocket: WebSocket | null = null
    messageHandler: TSocketMessageHandler | null = null 

    
    SetSocket(url:string, room_uuid:string, message_handler: TSocketMessageHandler){
        
        this.Websocket = new WebSocket(`${url}/${room_uuid}/`)

        this.Websocket.onopen = this.socketOnOpen
        this.Websocket.onmessage = this.socketOnMessage
        this.Websocket.onerror = this.socketOnError
        this.Websocket.onclose = this.socketOnClose
        
        this.messageHandler = message_handler

    }

    // Make send data method 
    socketSendData = (message: Message) => {
        let data = JSON.stringify(message)
        this.Websocket?.send(data)
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