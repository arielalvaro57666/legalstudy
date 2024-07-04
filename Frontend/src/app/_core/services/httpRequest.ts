import { createContext } from "react";
import { IHTTPdetail, IHTTPresponse, IHttpOptions } from "../interfaces/core.interface";


class httpRequestService{


    generateOptions<T = {}>(url: string, params: T ){
        const options : IHttpOptions = {
            url: url,
            params: params
        }

        return options
    }
    //Promise<[number, any]>
    async request<T>(method: string, options: IHttpOptions, with_credentials: boolean = false): Promise< IHTTPresponse<T> >{

        let settings: any = {
            method: method,
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        if (with_credentials === true){
            settings.credentials = 'include'
        }

        if (method === 'POST'){
            settings.body = JSON.stringify(options.params)
        }

        
        try{
            const response = await fetch(options.url, settings)
            const status = response.status
            const data: T = await response.json()
            


            // return [status,data]
            return {status: status,data: data}
    
        } catch (error){
            //return [500, { error: 'Internal Server Error' }];
            return {status: 500, data: undefined}
            
        }
    }
}

const httpRequestContext = createContext(new httpRequestService())
export default httpRequestContext