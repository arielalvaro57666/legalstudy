
import { createContext } from "react"
import { IWebSocket, TSocketMessageHandler } from "../interfaces/core.interface"
import { IMessage, IMessageData } from "@/app/_components/chat/interfaces/chat.interface"
import { WebsocketTypeEnum } from "../enums/core.enum"

class WebSocketService{

    websockets: IWebSocket[] = []
    messageHandler: TSocketMessageHandler | null = null 

    SetSocket(url:string, type: number, message_handler: TSocketMessageHandler){
        
        let websocket = new WebSocket(url)


        websocket.onopen = this.socketOnOpen
        websocket.onmessage = this.socketOnMessage
        websocket.onerror = this.socketOnError
        websocket.onclose = this.socketOnClose

        let websocket_data: IWebSocket = {
            type: type,
            websocket: websocket,
            handler: message_handler
        }
        // this.websocket.onopen = this.socketOnOpen
        // this.websocket.onmessage = this.socketOnMessage
        // this.websocket.onerror = this.socketOnError
        // this.websocket.onclose = this.socketOnClose
        this.websockets[type] = websocket_data


        
        // this.messageHandler = message_handler

    }

    // Make send data method 
    socketSendData = (type: number, message: IMessageData) => {
        let data = JSON.stringify(message)

        this.websockets[type].websocket.send(data)
        
        // this.websocket?.send(data)
    }
    
    socketOnOpen = (response: Event) => {
        // Make context state to the root and make the chat appear in case of success
        console.log(response)
    }

    socketOnMessage = (response: MessageEvent) => {
     
        let message: IMessage = JSON.parse(response.data) 
        console.log(message)
        
        this.websockets[message.type].handler(message.data)

        // this.messageHandler!(data.message)
    }

    socketOnClose = (response: CloseEvent) => {
        
    }

    socketOnError = (response: Event) => {
    
    }
}

const WebSocketServiceContext = createContext(new WebSocketService())
export default WebSocketServiceContext