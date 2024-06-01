// import '../style/home.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {useEffect,useState,useRef, FormEvent, ChangeEvent} from 'react'
// import '../style/fontawesome-free-6.4.0-web/css/all.css'
import { InputLabel, OutlinedInput } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button,Alert } from '@mui/material';



import FormLabel from '@mui/material/FormLabel';
import TextField from "@mui/material/TextField";
import { truncate } from 'fs'
import { parse } from 'path'


/*
    COMPONENTE DESITNADO A LA SECCION LABORAL INTERACTIVA
*/
export default function Civil(){
    const [showTitle,setShowTitle] = useState(true);
    //el provider es para transimitir el contexto con un value a los componentes hijos
    return(
        
        <section id='civil' className='w-full bg-[#222] mb-20'>
            <h1 className='sap mt-1 mb-10 lg:text-7xl text-4xl text-center cursor-default uppercase'>Civil</h1>
            <h4 className='text-orange-300 text-center font-thin text-2xl'>(Situaciones Frecuentes)</h4>


            <InitialOptions/>


            
        </section>
    )

}
function InitialOptions(){
    useEffect(()=>{
        AOS.init();
        //const webSocket = new WebSocket(`ws://localhost:8000/ws/752105`)
    },[]);
    const [displayLaboral, setDisplayLaboral] = useState(true);
    const [fired,setFired] = useState(false);
    const [black,setBlack] = useState(false);
    const [makeFired,setMakeFired] = useState(false);
    const [lessPay,setLessPay] = useState(false);
    const [jobAccident, setJobAccident] = useState(false);
    const [domestica, setDomestica] = useState(false);

    const handleClick = (option: string) =>{
        setDisplayLaboral(!displayLaboral);

        switch (option){
            case 'fired':
                setFired(!fired);
                break;
            case 'black':
                setBlack(!black);
                break;
            case 'makeFired':
                setMakeFired(!makeFired);
                break;
            case 'lessPay':
                setLessPay(!lessPay);
                break;
            case 'jobAccident':
                setJobAccident(!jobAccident);
                break;
            case 'domestic':
                setDomestica(!domestica);
                break;
            default:
                setFired(false);
                setBlack(false);
                setMakeFired(false);
                setLessPay(false);
                setJobAccident(false);
                setDisplayLaboral(!displayLaboral);
        }
        
    }

    return(
        <div className='w-full flex flex-col items-center relative '>
            <i className="fa-solid fa-arrow-left md:text-4xl text-zinc-900 cursor-pointer hover:scale-75 mt-4" style={{visibility:displayLaboral ? 'hidden' : 'visible'}} onClick={()=>{handleClick('')}}></i>
            {fired && <FiredPanel/> }
            {black && <BlackPanel/>}
            {makeFired && <MakeFiredPanel/>}
  
            
            {displayLaboral && <div className="w-2/3 2xl:w-3/4 xl:w-full flex flex-wrap justify-center gap-2 " data-aos="fade-up" >

                <div className='option shadow-slate-600 lg:h-72 lg:w-80 h-60 w-72 flex flex-col items-center justify-center relative border-2 border-solid border-neutral-700 cursor-pointer hover:border-orange-300' onClick={()=>{handleClick('fired')}}>
                    <div className='w-full h-full bg-civ0 absolute bg-cover bg-center opacity-50  bg-no-repeat z-0'></div>
                    <h2 className='uppercase text-white drop-shadow-xl font-normal z-10 text-xl'>Accidentes de transito</h2>
                </div>
                <div className='option shadow-slate-600 lg:h-72 lg:w-80 h-60 w-72 flex flex-col items-center justify-center relative border-2 border-solid border-neutral-700 cursor-pointer hover:border-orange-300' onClick={()=>{handleClick('black')}}>
                    <div className='w-full h-full bg-civ1 absolute bg-cover bg-center opacity-50  bg-no-repeat z-0'></div>
                    <h2 className='uppercase text-white drop-shadow-xl font-normal z-10 text-xl p-2 text-center'>Declaratoria de herederos/Sucesiones</h2>
                </div>
                <div className='option shadow-slate-600 lg:h-72 lg:w-80 h-60 w-72 flex flex-col items-center justify-center relative border-2 border-solid border-neutral-700 cursor-pointer hover:border-orange-300' onClick={()=>{handleClick('makeFired')}}>
                    <div className='w-full h-full bg-civ2 absolute bg-cover bg-center opacity-50  bg-no-repeat z-0'></div>
                    <h2 className='uppercase text-white drop-shadow-xl font-normal z-10 text-xl p-2 text-center'>DESALOJOS/CONTRATO DE LOCACIÓN/ADMINISTRACION DE INMUEBLES</h2>
                </div>





                

                







            </div>}
            
        </div>
        
    )
}

function FiredPanel(){
    const [firedInfo, setFiredInfo] = useState(true);
    const [extendWidth, setExtendWidth] = useState('100%');
    const [optionsToggleShow, setOptionsToggleShow] = useState([
        {id:0,bool:false},
        {id:1,bool:false},
        {id:2,bool:false}
    ])



    const showService = (serviceKey:number)=>{
           
        const triggeredItems = optionsToggleShow.map((item) => { // map each item of options toggle
            
            if (item.id === serviceKey) {
                if(item.bool){
                    item.bool = false;
                    setFiredInfo(true);
               
                
                }
                else{
                    item.bool = true;

                    
                    setFiredInfo(false);
                }
                
                 
                
            }
            else{
                item.bool = false;
            }
            
            
            return item;
        });
        //md:h-${extendHeight} h-${extendHeight}
    
        setOptionsToggleShow(triggeredItems); 
    }
    return(
    <div className='flex flex-row w-full md:w-11/12 flex-wrap justify-center gap-4 p-4 lg:gap-10 ' data-aos="fade-up">
        <div className={`laboralBox p-4 w-full md:w-5/6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  bg-[#1d1d1d] text-white text-center lg:text-xl flex flex-col gap-5 lg:items-center relative `}>
          
         {firedInfo && <h2>Explicación</h2>}
         {firedInfo && <p className='opacity-90'>Está situación se da cuando tú empleador toma la decisión de dejarte sin trabajo con o sin una causa que lo justifique. Dependiendo el caso concreto deberá abonarte o no una indemnización.</p>}

         {optionsToggleShow[0].bool && <h2>Con Causa</h2>}
         {optionsToggleShow[0].bool && <p className='opacity-90'>Si tu empleador te despide con causa, habrá que analizar si la misma era de tal magnitud como para dejarte sin trabajo, caso contrario se podrá hacer el reclamo correspondiente. DEl mismo modo si la causa es FALSA se podrán reclamar las indemnizaciones correspondientes.</p>}

         {optionsToggleShow[1].bool && <h2>Sin Causa</h2>}
         {optionsToggleShow[1].bool   &&<p className='opacity-90'>En este caso tu empleador te despide sin dar justificación alguna. Si bien está en su derecho de hacerlo, deberá pagar las indemnizaciones correspondientes</p>}

         {optionsToggleShow[2].bool && <div className='w-full flex flex-col items-center md:items-start'>
           
         </div>}

        </div>
        <div className='choice w-96 h-28 rounded-2xl bg-neutral-900 flex flex-col items-center justify-center hover:bg-zinc-900 cursor-pointer' onClick={()=>{showService(0)}}>
            <h2 className='text-white md:text-2xl opacity-80'>Con Causa</h2>
        </div>
        <div className='choice w-96 h-28 rounded-2xl bg-neutral-900 flex flex-col items-center justify-center hover:bg-zinc-900 cursor-pointer' onClick={()=>{showService(1)}}>
            <h2 className='text-white md:text-2xl opacity-80'>Sin Causa</h2>
        </div>
        <div className='choice w-96 h-28 rounded-2xl bg-neutral-900 flex flex-col items-center justify-center hover:bg-zinc-900 cursor-pointer' onClick={()=>{showService(2)}}>
            <h2 className='text-white md:text-2xl opacity-80'>Cuanto me corresponde</h2>
        </div>


      </div>
    )
}


function BlackPanel(){
    const [blackInfo, setBlackInfo] = useState(true);

    const [optionsToggleShow, setOptionsToggleShow] = useState([
        {id:0,bool:false},
        {id:1,bool:false}
    ])



    const showService = (serviceKey:number)=>{
           
        const triggeredItems = optionsToggleShow.map((item) => { // map each item of options toggle
            
            if (item.id === serviceKey) {
                if(item.bool){
                    item.bool = false;
                    setBlackInfo(true);
               
                
                }
                else{
                    item.bool = true;

                    
                    setBlackInfo(false);
                }
                
                 
                
            }
            else{
                item.bool = false;
            }
            
            
            return item;
        });
        //md:h-${extendHeight} h-${extendHeight}
    
        setOptionsToggleShow(triggeredItems); 
    }
    return(
    <div className='flex flex-row w-full md:w-11/12 flex-wrap justify-center gap-4 p-4 lg:gap-10 ' data-aos="fade-up">
        <div className={`laboralBox p-4 w-full md:w-5/6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-[#1d1d1d] text-white text-center lg:text-xl flex flex-col gap-5 lg:items-center relative `}>
          
         {blackInfo && <h2>Explicación</h2>}
         {blackInfo && <p className='opacity-90'>Trabajar en negro es simplemente trabajar sin un contrato laboral de por medio.</p>}

         {optionsToggleShow[0].bool && <h2>Trabajo Totalmente en Negro</h2>}
         {optionsToggleShow[0].bool && <p className='opacity-90'>En este caso, jamás te dieron de alta en AFIP, no tenés recibo de sueldo, ni obra social ni ART. POdes dejar de trabajar en cualquier momento sin necesidad de que te despidan y hacer el reclamo correspondiente tanto de indemnización como multas.</p>}

         {optionsToggleShow[1].bool && <h2>Trabajo Mal Registrado</h2>}
         {optionsToggleShow[1].bool   && <div>
            <p className='opacity-90'>En este caso, estás registrado pero no como corresponde. Es simple verificar: en tu recibo de sueldo figura un salario menor del que realmente cobras, una fecha de ingreso posterior a la que corresponde, o quizas nunca te dieron un recibo. Aqui se hace la intimación al empleador para que te registren correctamente y te pague las diferencias salariales y si no lo hace podes darte por despedido y hacer el reclamo de todas las indemnizaciones incluyendo multas por trabajo en negro</p>
         </div>}


        </div>
        <div className='choice w-96 h-28 rounded-2xl bg-neutral-900 flex flex-col items-center justify-center hover:bg-zinc-900 cursor-pointer' onClick={()=>{showService(0)}}>
            <h2 className='text-white md:text-2xl opacity-80'>Trabajo Totalmente en Negro</h2>
        </div>
        <div className='choice w-96 h-28 rounded-2xl bg-neutral-900 flex flex-col items-center justify-center hover:bg-zinc-900 cursor-pointer' onClick={()=>{showService(1)}}>
            <h2 className='text-white md:text-2xl opacity-80'>Trabajo Mal Registrado</h2>
        </div>



      </div>
    )
}
function MakeFiredPanel(){





    return(
    <div className='flex flex-row w-full md:w-11/12 flex-wrap justify-center gap-4 p-4 lg:gap-10 ' data-aos="fade-up">
        <div className={`laboralBox p-4 w-full md:w-5/6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-[#1d1d1d] text-white text-center lg:text-xl flex flex-col gap-5 lg:items-center relative `}>
          
         <h2>Explicación</h2>
         <p className='opacity-90'>Es muy común en la práctica que el empleador le pida al trabajador enviar la renuncia a través del correo Argentino a cambio de continuar trabajando en la empresa o de una suma indemnizatoria.<br></br> NUNCA MANDES LA RENUNCIA ES UNA TRAMPA!. Ya que, si la envias, no solo perderas la mayoría de tus derechos sino que, su luego tu empleador no quiere abonarte nada de lo prometido, no tendras como reclamarle que te pague.</p>
        </div>



      </div>
    )
}
