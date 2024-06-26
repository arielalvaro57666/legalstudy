
import banner from '../style/background1.jpg'
import logo from '../style/logoT.png'
import AOS from 'aos'

import 'aos/dist/aos.css'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
// import '../style/fontawesome-free-6.4.0-web/css/all.css'
// import '../style/home.css'
import { Button } from '@mui/material'
//import Slider from '../app/slider'
const Slider = dynamic(() => import('../slider/slider'),{
    ssr: false,
});
interface headerProp{
    chat: () => void;
}
//style={{backgroundImage: `url(${banner.src})`}}
export default function Navbar(){//{chat}:headerProp
    useEffect(()=>{
        AOS.init();
        //if scroll changeColor
        window.addEventListener('scroll',changeColor)
    
        //if click check outside click for dropdown
        window.addEventListener('click',hideDropDown)
        return () => {
            // Eliminar event listener 1
            window.removeEventListener('evento1', changeColor);
        
            // Eliminar event listener 2
            window.removeEventListener('evento2', hideDropDown);
          };

    },[]);

    //Change Nav Color when scroll
    const [colorNav, setColorNav] = useState('bg-transparent');
    const [colorRef, setColorRef] = useState('bg-transparent');
    const [showDropDown, setShowDropDown] = useState(false);
    const dropdownRef = useRef(null);
    const barsRef = useRef(null);

    const collapseDropDown = () => {
        setShowDropDown(true);
    }
    const hideDropDown = (e:Event) => {
        // if click not bars then false
        if(e.target != barsRef.current){
            setShowDropDown(false);
        }

    }


    const changeColor = () => {
        if (window.scrollY >= 90){
            setColorNav('bg-zinc-900');
            setColorRef('bg-black');
        }
        else{
            setColorNav('bg-transparent')
            setColorRef('bg-transparent');
        }
    }
//#1d1d1d
    return(
        <>
            <div className='w-full flex flex-col' >
                <nav className={`w-full 2xl:h-28 xl:h-24 h-14 ${colorNav} flex flex-row justify-between items-center fixed left-0 top-0 z-50`}>
                    <div className='2xl:hidden xl:hidden'></div>
                    <div className='logo 2xl:w-48 2xl:h-48 xl:w-40 xl:h-40 w-20 h-20 bg-contain bg-no-repeat bg-center 2xl:left-2 2xl:top-0.5 2xl:p-4 xl:left-2 xl:top-0.5  xl:p-4 p-2 rounded-full relative 2xl:rounded-none xl:rounded-none'>
                        <img className='w-full h-full ' width={20} height={30} src='/static/logoT.png' alt='logo'></img>

                    </div>
                    <div className="relative inline-block text-left xl:hidden 2xl:hidden right-10" >
                        <button className='flex flex-col space-y-1 drop-shadow-2xl' onClick={collapseDropDown} >
                            <i className="fa-solid fa-bars text-white text-2xl" ref={barsRef}></i>
                        </button>

                        {showDropDown&& <div className="absolute right-0 z-10 mt-2 w-56 divide-gray-100 rounded-md bg-zinc-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" ref={dropdownRef}>
                            
                    
                            <a href="#" className="text-white block px-4 py-2 text-sm" role="menuitem"  id="menu-item-0">Nosotros</a>
                            {/* <a href="#" className="text-white block px-4 py-2 text-sm" role="menuitem"  id="menu-item-1">Preguntas Frecuentes</a> */}
           
                           
                            <a href="#laboral" className="text-white block px-4 py-2 text-sm" role="menuitem"  id="menu-item-2">Laboral</a>
                            <a href="#" className="text-white block px-4 py-2 text-sm" role="menuitem"  id="menu-item-3">Civil</a>
                          
                           
                            <a href="#" className="text-white block px-4 py-2 text-sm" role="menuitem"  id="menu-item-4">Familiar</a>
                            <a href="#" className="text-white block px-4 py-2 text-sm" role="menuitem"  id="menu-item-5">Contacto</a>
                         
                           
                        </div>}
                        
                    </div>
                
                    <div className='2xl:flex hidden xl:flex 2xl:space-x-5 xl:space-x-5  2xl:relative right-10'>
                        
                        <a className= {`text-center bg-${colorNav} flex items-center justify-center text-white opacity-70 font-medium 2xl:h-10 xl:h-10 h-2 drop-shadow-2xl 2xl:font  2xl:text-lg   xl:text-md no-underline 2xl:w-50 2xl:p-5 xl:w-50 xl:p-5 p-3 rounded-md text-xs`} href='#home' ><h2>Nosotros</h2></a>
                        <a className= {`text-center bg-${colorNav} flex items-center justify-center text-white opacity-70 font-medium 2xl:h-10 xl:h-10 h-2 drop-shadow-2xl 2xl:font  2xl:text-lg   xl:text-md no-underline 2xl:w-50 2xl:p-5 xl:w-50 xl:p-5 p-3 rounded-md text-xs`} href='#laboral' ><h2>Laboral</h2></a>
                        <a className= {`text-center bg-${colorNav} flex items-center justify-center text-white opacity-70 font-medium 2xl:h-10 xl:h-10 h-2 drop-shadow-2xl 2xl:font  2xl:text-lg   xl:text-md no-underline 2xl:w-50 2xl:p-5 xl:w-50 xl:p-5 p-3 rounded-md text-xs`} href='#civil' ><h2>Civil</h2></a>
                        <a className= {`text-center bg-${colorNav} flex items-center justify-center text-white opacity-70 font-medium 2xl:h-10 xl:h-10 h-2 drop-shadow-2xl 2xl:font  2xl:text-lg   xl:text-md no-underline 2xl:w-50 2xl:p-5 xl:w-50 xl:p-5 p-3 rounded-md text-xs`} href='#familia' ><h2>Familiar</h2></a>
                        <a className= {`text-center bg-${colorNav} flex items-center justify-center text-white opacity-70 font-medium 2xl:h-10 xl:h-10 h-2 drop-shadow-2xl 2xl:font  2xl:text-lg   xl:text-md no-underline 2xl:w-50 2xl:p-5 xl:w-50 xl:p-5 p-3 rounded-md text-xs`} href='#laboral' ><h2>Contacto</h2></a>
         
                    </div>





                </nav>

            </div>
        </>
    )

}



