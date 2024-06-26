import { createContext } from "react";
import { IHttpOptions } from "../interfaces/core.interface";


class httpRequestService{


    generateOptions<T = {}>(url: string, params: T ){
        const options : IHttpOptions = {
            url: url,
            params: params
        }

        return options
    }
 
    async request(method: string, options: IHttpOptions): Promise<[number, any]>{

        let settings: any = {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }

        if (method === 'POST'){
            settings.body = JSON.stringify(options.params)
        }

        
        try{
            const response = await fetch(options.url, settings)
            const status = response.status
            const data = await response.json()
            
            

            return [status,data]
    
        } catch (error){
            return [500, { error: 'Internal Server Error' }];
        }
    }
}

const httpRequestContext = createContext(new httpRequestService())
export default httpRequestContext