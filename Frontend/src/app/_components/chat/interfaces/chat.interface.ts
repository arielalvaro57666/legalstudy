
export interface IMessage{
    type: number
    data: IMessageData
}

export interface IMessageData{
    user_type?: string
    text: string
}

export interface IChat{
    roomID: string
}