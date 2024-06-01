// import '../style/home.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {useEffect,useState,useRef, FormEvent, ChangeEvent} from 'react'
// import '../style/fontawesome-free-6.4.0-web/css/all.css'

import { DisplayInfo } from '@/app/_core/display-info/display-info';
import { IRequestDisplay, IRequestDisplayProp } from '@/app/_core/display-info/interfaces/display-info.interface';
import { LaboralEnum } from './enums/labor.enum';

//Icons
import { HiArrowCircleLeft } from "react-icons/hi";
import { IndemnizacionCalculo } from './labor-formula';



/*
    COMPONENTE DESITNADO A LA SECCION LABORAL INTERACTIVA
*/
export default function Laboral(){
   

    return(
        
        <section id='laboral' className='w-full bg-[#222] mb-20'>
            <h1 className='sap mt-1 mb-10 lg:text-7xl text-4xl text-center cursor-default uppercase'>Laboral</h1>
            <h4 className='text-orange-300 text-center font-thin text-2xl mb-6'>(Situaciones Frecuentes)</h4>


            <InitialOptions/>


            
        </section>
    )

}
function InitialOptions(){


    const section = 'Laboral'
    const [selected, setSelected] = useState<boolean>(false);
    const [selection, setSelection] = useState<string>('')



    useEffect(()=>{
        AOS.init();

        if (selection !== ''){
            setSelected(true)
        }

    },[selection]);
    

    const handleSelection = (newSelection: string) => {

        setSelection(newSelection)
    }

    const closeSelection = () => {
        setSelection('')
        setSelected(false)
    }

    return(
        <div className='w-full flex flex-col items-center relative '>
            {selected ? <HiArrowCircleLeft  className='w-8 h-8 text-gray-100 cursor-pointer' onClick={closeSelection}/> : null}
            {!selected ? 

            <div className="w-2/3 2xl:w-3/4 xl:w-full flex flex-wrap justify-center gap-2 " data-aos="fade-up" >

                <div className='option shadow-slate-600 lg:h-72 lg:w-80 h-60 w-72 flex flex-col items-center justify-center relative border-2 border-solid border-neutral-700 cursor-pointer hover:border-orange-300' onClick={()=>{handleSelection(LaboralEnum.MeDespidieron)}}>
                    <div className='w-full h-full bg-lab0 absolute bg-cover bg-center opacity-50  bg-no-repeat z-0'></div>
                    <h2 className='uppercase text-white drop-shadow-xl font-normal z-10 text-xl'>me despidieron</h2>
                </div>

                <div className='option shadow-slate-600 lg:h-72 lg:w-80 h-60 w-72 flex flex-col items-center justify-center relative border-2 border-solid border-neutral-700 cursor-pointer hover:border-orange-300' onClick={()=>{handleSelection(LaboralEnum.TrabajoEnNegro)}}>
                    <div className='w-full h-full bg-lab5 absolute bg-cover bg-center opacity-50  bg-no-repeat z-0'></div>
                    <h2 className='uppercase text-white drop-shadow-xl font-normal z-10 text-xl p-2 text-center'>Estoy trabajando en negro</h2>
                </div>

                <div className='option shadow-slate-600 lg:h-72 lg:w-80 h-60 w-72 flex flex-col items-center justify-center relative border-2 border-solid border-neutral-700 cursor-pointer hover:border-orange-300' onClick={()=>{handleSelection(LaboralEnum.Renunciar)}}>
                    <div className='w-full h-full bg-lab4 absolute bg-cover bg-center opacity-50  bg-no-repeat z-0'></div>
                    <h2 className='uppercase text-white drop-shadow-xl font-normal z-10 text-xl p-2 text-center'>me quieren hacer renunciar</h2>
                </div>
                
                <div className='option shadow-slate-600 lg:h-72 lg:w-80 h-60 w-72 flex flex-col items-center justify-center relative border-2 border-solid border-neutral-700 cursor-pointer hover:border-orange-300' onClick={()=>{handleSelection(LaboralEnum.PaganMenos)}}>
                    <div className='w-full h-full bg-lab7 absolute bg-cover bg-center opacity-50  bg-no-repeat z-0'></div>
                    <h2 className='uppercase text-white drop-shadow-xl font-normal z-10 text-xl'>me pagan menos</h2>
                </div>

                <div className='option shadow-slate-600 lg:h-72 lg:w-80 h-60 w-72 flex flex-col items-center justify-center relative border-2 border-solid border-neutral-700 cursor-pointer hover:border-orange-300' onClick={()=>{handleSelection(LaboralEnum.AccidenteTrabajo)}}>
                    <div className='w-full h-full bg-lab1 absolute bg-cover bg-center opacity-50  bg-no-repeat z-0'></div>
                    <h2 className='uppercase text-white drop-shadow-xl font-normal z-10 text-xl'>Accidentes de trabajo</h2>
                </div>

                <div className='option shadow-slate-600 lg:h-72 lg:w-80 h-60 w-72 flex flex-col items-center justify-center relative border-2 border-solid border-neutral-700 cursor-pointer hover:border-orange-300' onClick={()=>{handleSelection(LaboralEnum.Domestico)}}>
                    <div className='w-full h-full bg-lab2 absolute bg-cover bg-center opacity-50  bg-no-repeat z-0'></div>
                    <h2 className='uppercase text-white drop-shadow-xl font-normal z-10 text-xl'>Empleada domestica</h2>
                </div>


            </div> : null}
            <i className="fa-solid fa-arrow-left md:text-4xl text-zinc-900 cursor-pointer hover:scale-75 mt-4" style={{visibility:selected ? 'hidden' : 'visible'}} onClick={()=>{handleSelection('')}}></i>
            
            {selected ? <DisplayInfo section={section} selection={selection}/> : null}
            {/* <DisplayInfo displayRequest={request}/>    */}


        </div>
        
    )
}


