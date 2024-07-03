import { IMessageData } from "@/app/_components/chat/interfaces/chat.interface"

export interface IChatPanelProp{
    chatHandler: (chat:IChat) => void
}

export interface IChat{
    created:string
    roomID: string
    status: string
    client: IClient
    messages: IMessageData
    
}

export interface IClient{
    name: string
    cellphone: number
}

