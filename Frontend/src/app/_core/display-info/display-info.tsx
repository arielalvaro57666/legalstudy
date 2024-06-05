import { useContext, useEffect, useState } from "react";
import { IDisplayInfo, IOptionProp, IRequestDisplay, IRequestDisplayProp } from "./interfaces/display-info.interface";
import DisplayServiceContext from "./services/display.services";
import { ComponentMap } from "../component-map/component-map";
import { info } from "console";
import { Indemnization } from "@/app/_components/labor/labor-formula";



export function DisplayInfo({section, selection}: IRequestDisplay, ){ 

    const display_service = useContext(DisplayServiceContext)

    const [information, setInformation] = useState<IDisplayInfo | undefined>(undefined)
    const [calculoSelected, setCalculoSelected] = useState(false)
    const [options, setOptions] = useState<JSX.Element[]>([])

    useEffect(()=>{

        getData({section, selection})

    },[])

    //Get text of specific section, selection and option
    const getData = (request: IRequestDisplay, option = 'Explicacion') => {

        const newInformation = display_service.getData(request, option) 
        const options = generateOptions(newInformation)

        setInformation(newInformation)
        setOptions(options)
    }

    //Generate html elements (with handleChange function and option name)
    const generateOptions = (information: IDisplayInfo) => {
        let components: JSX.Element[] = []
        
        for (let option of information.options){
            
            let button: JSX.Element = <OptionButton option={option} handleChange={handleChange}/>;
            components.push(button)

        }
  
        return components

    }

    const generateCalculo = () => {

    }

    // Change option 
    const handleChange = (option: string) => {
        option === 'Cuanto me corresponde' ? setCalculoSelected(true) : setCalculoSelected(false)
        

        getData({section, selection}, option)
    }

    return(
        <div className='flex flex-row w-full md:w-11/12 flex-wrap justify-center gap-4 p-4 lg:gap-10 ' data-aos="fade-up">

            {!calculoSelected ? 
            
            <div className="p-4 w-full  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  bg-[#1d1d1d] text-white text-center flex flex-col gap-5 relative" >
            
                <h2>{information?.option}</h2>
                
                <p className='opacity-90'>{information?.text}</p>
            </div>
            
            : <Indemnization/> }

            <div className="w-full flex flex-col gap-4
                            lg:flex-row lg:justify-center">
                <ComponentMap components={options}/>
            </div>



      </div>
    )
}

export function OptionButton({option, handleChange}: IOptionProp){

    return(
        <>
            <div className='p-[2rem] w-full h-20 rounded-2xl text-center bg-neutral-900 flex flex-col items-center justify-center hover:bg-zinc-900 cursor-pointer
                             lg:w-72' onClick={()=>{handleChange(option)}}>

                <h2 className='text-white text-lg opacity-80'>{option}</h2>

            </div>
        </>
    )
}
