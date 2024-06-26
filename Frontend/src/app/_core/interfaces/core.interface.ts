export interface IHttpOptions{
    url: string
    params?: any
}

export interface IHTTPresponse<T>{
    status: number | null,
    data: T | IHTTPdetail | null
}

interface IHTTPdetail{
    detail: string
}

export type TSocketMessageHandler = (obj: any) => void