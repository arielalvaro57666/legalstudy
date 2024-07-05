'use client'
import DataServiceContext from "@/app/_core/services/dataService"
import httpRequestContext from "@/app/_core/services/httpRequest"
import { FormEvent, useContext, useEffect } from "react"
import loginServiceContext from "./services/login.service"
import { IHTTPresponse, IHttpOptions } from "@/app/_core/interfaces/core.interface"
import { IRequestUser } from "./interfaces/login.interface"

import { useRouter } from "next/navigation"
import { Loading } from "@/app/_core/components/loading/loading"
import { HTTPMethodEnum } from "@/app/_core/enums/core.enum"

export default function Login() {
    const api_service = useContext(httpRequestContext)
    const data_service = useContext(DataServiceContext)
    const login_service = useContext(loginServiceContext)

    const router = useRouter()

    const url = data_service.setUrl('auth/login/')

    const requestLogin = async (data: any) => {
        const requestData: IRequestUser = login_service.processData(data.username, data.password)
        const options: IHttpOptions = api_service.generateOptions<IRequestUser>(url, requestData)
        const response: IHTTPresponse<any> = await api_service.request<any>(HTTPMethodEnum.POST, options)

        if(response.status != 200){
            //toast warning logic
            return
        }
        

        router.push("/admin/dashboard")
        
    }


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        
        requestLogin(data)

    }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#1a1b1e] px-4">
        <div className="w-full max-w-[400px] rounded-lg bg-[#2b2c31] p-8 shadow-lg">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white">Bienvenido</h2>
                <p className="text-muted-foreground">Iniciar sesion</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="mb-2 block text-sm font-medium text-white">
                    Usuario
                    </label>
                    <input
                    type="text"
                    name="username"
                    placeholder="Ingrese su usuario"
                    className="w-full rounded-md border-[#3c3d42] bg-[#3c3d42] px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-white">
                    Contraseña
                    </label>
                    <input
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    className="w-full rounded-md border-[#3c3d42] bg-[#3c3d42] px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
                <button type="submit" className="w-full">
                    Iniciar sesion
                </button>
            </form>
        </div>
    </div>
  )
}