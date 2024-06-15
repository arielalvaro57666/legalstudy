export interface IHttpOptions{
    url: string
    params?: any
}

export type TSocketMessageHandler = (obj: any) => void