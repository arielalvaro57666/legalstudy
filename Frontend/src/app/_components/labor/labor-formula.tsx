import { FormEvent, useContext, useEffect, useState } from "react";

import { ICompensationResultsProp, ICompensationRequest, ICompensationResponse, IFormCompensation, ICompensationFormProp, IFormError } from "./interfaces/labor.interface";
import httpRequestContext from "@/app/_core/services/httpRequest";
import DataServiceContext from "@/app/_core/services/dataService";
import { IHTTPresponse, IHttpOptions } from "@/app/_core/interfaces/core.interface";
import laborServiceContext from "./services/labor.service";


export function Indemnization(){

    const [calculated, setCalculated] = useState(false)
    const [results, setResults] = useState<ICompensationResponse | null>(null)
    

    useEffect(()=> {

        if ( results != null ){
            setCalculated(!calculated)
        }

    },[results])

    const handleResults = (results: ICompensationResponse) => {
        setResults(results)
    }
 
    return(
        <div className="w-full relative">
            {innerWidth < 1024 && 
            (!calculated ? <CompensationForm handleResults={handleResults}/> : <CompensationResults results={results}/>)}


            {innerWidth >= 1024 && 

                    
            <section className="lg:grid lg:grid-cols-2 lg:grid-rows-1 gap-4 lg:p-4  bg-[#1d1d1d]">
                <div className="lg:border-r-2"><CompensationForm handleResults={handleResults}/> </div>
                
                <div><CompensationResults results={results}/></div>
                
            </section>}

        </div>
    
    )
}
export function CompensationForm({handleResults}: ICompensationFormProp){

    const http_service = useContext(httpRequestContext)
    const data_service = useContext(DataServiceContext)
    const labor_service = useContext(laborServiceContext)


    //TODO: Cambiar esto a algo mas centralizado y accesible en vez de llamar siempre a setUrl
    const url = data_service.setUrl("calculo")
    console.log("##########3, u",url)
    const [formErrors, setFormErrors] = useState<IFormError>({dateError:'',salaryError:''})

    const requestCalculo = async (data: any) => {
        console.log("########## data -> ",data)
        const requestData = labor_service.processData(data)
        const options: IHttpOptions =  http_service.generateOptions(url, requestData) 
        const [status,response] = await http_service.request('POST', options)
        console.log(response)
        // if everything went correct
        if(status != 200){
            //toast warning logic
            return
        }

        handleResults(response.data)

    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        const [isValid, errors] = labor_service.checkData(data)

        setFormErrors(errors)
        
        if (isValid === true){
            requestCalculo(data)
        }

    }

    return(
        <>
            <div className="w-full bg-[#1d1d1d]">

                <section className=" p-4">
                    <form className="flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit}> 
                        
                        <div className="flex flex-col items-center gap-2 lg:flex lg:flex-row lg:justify-center lg:gap-10">
                            <span className="text-red-500 font-extralight lg:absolute top-1">{formErrors.dateError}</span>
                            <div className=" flex flex-col items-center gap-1">
                                <h2 className="text-white opacity-80">Fecha de ingreso</h2>
                                <input className=" bg-zinc-800 text-white opacity-80 rounded-md text-lg border-2 border-zinc-900" type="date" name="initial_date"/>
                            </div>

                            <div className=" flex flex-col items-center gap-1">
                                <h2 className="text-white opacity-80">Fecha de salida</h2>
                                <input className=" bg-zinc-800 text-white opacity-80 rounded-md text-lg border-2 border-zinc-900" type="date" name="final_date"/>
                            </div>
                        </div>
                        
                        <div className=" flex flex-col items-center gap-1">
                            <span className="text-red-500 font-extralight">{formErrors.salaryError}</span>
                            <h2 className="text-white opacity-80">sueldo</h2>
                            <input className=" bg-zinc-800 text-white text-center opacity-80 rounded-md text-lg border-2 border-zinc-900" min={0} type="number" placeholder="0" name="salary"/>
                        </div>

            
                        <div className="w-full flex flex-col justify-center items-center">
                            <h2 className=" mb-[0.25rem] text-white opacity-80">Motivo del fin de la relación laboral</h2>

                            <div className="w-full flex flex-col gap-4">

                                <div className="relative flex justify-center">
                                    <input className="sr-only peer" type="radio" value="Con causa" name="reason" id="concausa"/>

                                    <label className="flex p-2 bg-zinc-800 border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-zinc-900 peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 w-[80%]" htmlFor="concausa">Con causa</label>

                                </div>
                                <div className="relative flex justify-center">
                                    <input className="sr-only peer" type="radio" value="Sin causa" name="reason" id="sincausa" defaultChecked/>

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
                                    <input className="sr-only peer" type="radio" value="false" name="noticed" id="preavisono" defaultChecked/>

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
                                    <input className="sr-only peer" type="radio" value="true" name="black" id="negrosi" defaultChecked/>

                                    <label className="flex p-2 bg-zinc-800 border border-gray-500 rounded-lg cursor-pointer focus:outline-none hover:bg-zinc-900 peer-checked:ring-blue-700 peer-checked:ring-2 peer-checked:border-transparent justify-center text-white opacity-80 w-[80%]" htmlFor="negrosi">Si</label>

                                </div>

        
        

                            </div>

                        </div>

                        <button type="submit" className="p-4 bg-zinc-800 rounded-md text-white hover:bg-blue-950">Calcular</button>
                    </form>
                </section>

    
                
            </div>
        </>
    
    )
}

function CompensationResults({results}: ICompensationResultsProp){

    return(
        <div className="w-full animate-appear-opacity bg-[#1d1d1d]">

            <section className="p-4">
                <ul className='flex flex-col gap-2.5'>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Antigüedad Art. 245</h3>
                        <h3 className="text-white opacity-80">${results?.antiquity}</h3>
                    </li>
                    {/* <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Multa por trabajo en negro</h3>
                        <h3 className="text-white opacity-80">${results.}</h3>
                    </li> */}
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Sustitutiva de Preaviso </h3>
                        <h3 className="text-white opacity-80">${results?.noticedSust}</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">SAC Preaviso</h3>
                        <h3 className="text-white opacity-80">${results?.noticedSac}</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Días trabajados del Mes</h3>
                        <h3 className="text-white opacity-80">${results?.dayMonth}</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Integración mes de Despido </h3>
                        <h3 className="text-white opacity-80">${results?.monthIntegration}</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">SAC Proporcional </h3>
                        <h3 className="text-white opacity-80">${results?.proportionalSac}</h3>
                    </li>
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Vacaciones no gozadas </h3>
                        <h3 className="text-white opacity-80">${results?.holiday}</h3>
                    </li>
                    {/* <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Multa por trabajo en negro</h3>
                        <h3 className="text-white opacity-80">22</h3>
                    </li> */}
                    <li className='p-4 pr-24 w-full flex flex-row  text-left text-base rounded-lg shadow-sm shadow-white bg-zinc-900 justify-between'>
                        <h3 className="w-1/2 text-white opacity-80">Total</h3>
                        <h3 className="text-white opacity-80">${results?.total}</h3>
                    </li>                     
                </ul>

            </section>

        </div>
    )

}