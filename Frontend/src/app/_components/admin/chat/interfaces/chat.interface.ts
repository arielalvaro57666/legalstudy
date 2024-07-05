import { IChat, IMessageData } from "@/app/_components/chat/interfaces/chat.interface"

export interface IChatPanelProp{
    chatHandler: (chat:IChat) => void
}


export interface IClient{
    name: string
    cellphone: number
}

