

export interface IChatProp{
    actual_user: string
    chat_data?: IChatData
}

export interface IChatData{
    roomID: string
    status: string
    client_data: IClientData
}

export interface IClientData{
    name: string
    cellphone: number
}

export interface IMessageProp{
    origin: string
    message: IMessageData
}

export interface IMessage{
    type: number
    data: IMessageData
}

export interface IMessageData{
    user_type?: string
    message_type?: number
    text: string
}

export interface IChat{
    roomID: string
}