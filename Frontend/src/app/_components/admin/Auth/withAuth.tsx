"use client"

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import httpRequestContext from "@/app/_core/services/httpRequest";
import { red } from "@mui/material/colors";
import DataServiceContext from "@/app/_core/services/dataService";
import { Loading } from "@/app/_core/components/loading/loading";

 //HOC AUTH
export default function withAuth(Component: any){
    //
    // Manage return of protected Component
    return function WithAuth(){
        
        const api_service = useContext(httpRequestContext)
        const data_service = useContext(DataServiceContext)

        const url = data_service.setUrl('auth/verify/')
        const router = useRouter()
        
    
        const [authenticated, setAuthenticated] = useState(false)

        useEffect(()=>{
  
            authenticate()

        },[])

        const authenticate = async () => {
            const options = api_service.generateOptions(url,{})
            const [status,response] = await api_service.request("GET", options)
    
            if (status != 200){
                router.push("/admin/login")
            }

            setAuthenticated(true)
            
        }


        if (! authenticated){
            return(
                <div className="w-screen h-screen">
                    <Loading/>
                </div>  
            ) 
        
            
        }



        return <Component/>
    }
}

