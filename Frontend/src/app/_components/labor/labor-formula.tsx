import { FormEvent, useContext, useState } from "react";

import { ICompensationRequest, IFormCompensation } from "./interfaces/labor.interface";
import httpRequestContext from "@/app/_core/services/httpRequest";
import DataServiceContext from "@/app/_core/services/dataService";
import { IHttpOptions } from "@/app/_core/interfaces/core.interface";
import { CalculoRequest } from "./utils/labor-utils";


export function IndemnizacionCalculo(){

    const http_service = useContext(httpRequestContext)
    const data_service = useContext(DataServiceContext)
    const url = data_service.setUrl("calculo")


     const requestCalculo = async (data: any) => {
        
        const requestData = CalculoRequest.processData(data)
        const options: IHttpOptions =  http_service.generateOptions(url, requestData) 
        const response = await http_service.request('POST', options)

        console.log(response)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        
        
        requestCalculo(data)
    }

    return(
        <div className="w-full ">

            <section className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  bg-[#1d1d1d] p-4">
                <form className="flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit}> 
                    <div className=" flex flex-col items-center gap-1">
                        <h2 className="text-white opacity-80">Fecha de ingreso</h2>
                        <input className=" bg-zinc-800 text-white opacity-80 rounded-md text-lg border-2 border-zinc-900" type="date" name="initial_date"/>
                    </div>

                    <div className=" flex flex-col items-center gap-1">
                        <h2 className="text-white opacity-80">Fecha de salida</h2>
                        <input className=" bg-zinc-800 text-white opacity-80 rounded-md text-lg border-2 border-zinc-900" type="date" name="final_date"/>
                    </div>

                    <div className=" flex flex-col items-center gap-1">
                        <h2 className="text-white opacity-80">sueldo</h2>
                        <input className=" bg-zinc-800 text-white text-center opacity-80 rounded-md text-lg border-2 border-zinc-900" min={0} type="number" name="salary"/>
                    </div>

        
                    <div className="w-full flex flex-col justify-center items-center">
                        <h2 className=" mb-[0.25rem] text-white opacity-80">Motivo del fin de la relación laboral</h2>

                        <div className="w-full flex flex-col gap-4">

                            <div className="relative flex justify-center">
                                <input className="sr-only peer" type="radio" value="Con causa" name="reason" id="concausa"/>

                                <label className="flex p-2 bg-zinc-800 border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-zinc-900 peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 w-[80%]" htmlFor="concausa">Con causa</label>

                            </div>
                            <div className="relative flex justify-center">
                                <input className="sr-only peer" type="radio" value="Sin causa" name="reason" id="sincausa"/>

                                <label className="flex p-2 bg-zinc-800 border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-zinc-900 peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 w-[80%]" htmlFor="sincausa">Sin causa</label>

                            </div>

                            <div className="relative flex justify-center">
                                <input className="sr-only peer" type="radio" value="Renuncia" name="reason" id="renuncia"/>

                                <label className="flex p-2 bg-zinc-800 border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-zinc-900 peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 w-[80%]" htmlFor="renuncia">Renuncia</label>
                                    
                            </div>
    

                        </div>



                    </div>

                    <div className="w-full flex flex-col justify-center items-center">
                        <h2 className=" mb-[0.25rem] text-white opacity-80">¿Hubo preaviso?</h2>

                        <div className="w-full flex flex-col gap-4">

                            <div className="relative flex justify-center">
                                <input className="sr-only peer" type="radio" value="false" name="noticed" id="preavisono"/>

                                <label className="flex p-2 bg-zinc-800 border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-zinc-900 peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 w-[80%]" htmlFor="preavisono">No</label>

                            </div>
                            <div className="relative flex justify-center">
                                <input className="sr-only peer" type="radio" value="true" name="noticed" id="preavisosi"/>

                                <label className="flex p-2 bg-zinc-800 border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-zinc-900 peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 w-[80%]" htmlFor="preavisosi">Si</label>

                            </div>

    
    

                        </div>



                    </div>


                    <div className="w-full flex flex-col justify-center items-center">
                        <h2 className=" mb-[0.25rem] text-white opacity-80">¿Trabajaste en negro?</h2>

                        <div className="w-full flex flex-col gap-4">

                            <div className="relative flex justify-center">
                                <input className="sr-only peer" type="radio" value="false" name="black" id="negrono"/>

                                <label className="flex p-2 bg-zinc-800 border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-zinc-900 peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 w-[80%]" htmlFor="negrono">No</label>

                            </div>
                            <div className="relative flex justify-center">
                                <input className="sr-only peer" type="radio" value="true" name="black" id="negrosi"/>

                                <label className="flex p-2 bg-zinc-800 border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-zinc-900 peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 w-[80%]" htmlFor="negrosi">Si</label>

                            </div>

    
    

                        </div>

                    </div>

                    <button type="submit" className="p-4 bg-zinc-800 hover:bg-blue-950">Calcular</button>
                </form>
            </section>
            <IndemnizacionCalculoResults/>
        </div>
    
    
    )
}

function IndemnizacionCalculoResults(){

    return(
        <div className="w-full mt-5">

            <section className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  bg-[#1d1d1d] p-4">
                <ul className='flex flex-col gap-2.5'>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Antigüedad Art. 245</h3>
                        <h3 className="text-white opacity-80">22</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Multa por trabajo en negro</h3>
                        <h3 className="text-white opacity-80">22</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Sustitutiva de Preaviso </h3>
                        <h3 className="text-white opacity-80">22</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">SAC Preaviso</h3>
                        <h3 className="text-white opacity-80">22</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Días trabajados del Mes</h3>
                        <h3 className="text-white opacity-80">22</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Integración mes de Despido </h3>
                        <h3 className="text-white opacity-80">22</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">SAC Proporcional </h3>
                        <h3 className="text-white opacity-80">22</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Vacaciones no gozadas </h3>
                        <h3 className="text-white opacity-80">22</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Multa por trabajo en negro</h3>
                        <h3 className="text-white opacity-80">22</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Total</h3>
                        <h3 className="text-white opacity-80">22</h3>
                    </li>                     
                </ul>

            </section>

        </div>
    )

}