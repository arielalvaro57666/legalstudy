import { createContext } from "react";
import { IHttpOptions } from "../interfaces/core.interface";


class httpRequestService{


    generateOptions(url: string, paramas: any = {} ){
        const options : IHttpOptions = {
            url: url,
            params: paramas
        }

        return options
    }
 
    async request(method: string, options: IHttpOptions){

        let settings: any = {
            method: method,
            headers: {"Content-Type": "application/json"},
        }

        if (method === 'POST'){
            settings.body = JSON.stringify(options.params)
        }


        try{
            const response = await fetch(options.url, settings)
            const data = await response.json()
            
            return data
    
        } catch (error){
    
            console.log(error)
        }
    }
}

const httpRequestContext = createContext(new httpRequestService())
export default httpRequestContext