export interface IChat{
    created:string
    roomID: string
    status: string
    client: IClient
    messages: IMessage[]

    
}

export interface IClient{
    name: string
    cellphone: number
}

export interface IMessage{
    user_type: string
    text: string
}