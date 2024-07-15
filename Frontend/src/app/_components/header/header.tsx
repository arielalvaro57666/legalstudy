
"use client"
import banner from '../style/background1.jpg'
import logo from '../style/logoT.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { GiInjustice } from "react-icons/gi";
// import '../../../style/fontawesome-free-6.4.0-web/css/all.css'
//import '../style/home.css'
import { Button } from '@mui/material'
//import Slider from '../app/slider'
const Slider = dynamic(() => import('../slider/slider'),{
    ssr: false,
});
import { BsHexagonFill } from "react-icons/bs";
//style={{backgroundImage: `url(${banner.src})`}}
export default function Header(){


    return(
        <>
            <div id='home' className='w-full flex flex-col bg-[#1d1d1d]'>

                <section className='w-full h-full flex flex-col items-center relative'>

                    <div className='w-full 2xl:h-[30rem] xl:h-[20rem] h-[20rem] relative'>
                        <Slider/>
                    </div>

                    <i id='lara' className="hexagon fa-solid fa-scale-balanced 2xl:text-4xl xl:text-3xl absolute 2xl:top-[31.1rem] xl:top-[20.6rem] top-[20.9rem] text-lg text-gray-400 "></i>
                    
                    <div className='box w-10 2xl:w-16 xl:w-14 absolute 2xl:top-[29.9rem] xl:top-[19.6rem] top-[20rem] bg-slate-500 '></div>

                    <div className='w-1/2 2xl:h-20 xl:h-20 h-8 top-[19rem] absolute 2xl:top-[28rem] xl:top-[18rem] rounded-t-full bg-[#1d1d1d]' ></div>
                    
                    <div className='relative top-10'>
                        <BsHexagonFill className='w-20 h-20 top-14 drop-shadow-md text-gray-400'/>
                        <GiInjustice className='w-12 h-12 absolute text-blue-800 left-4 bottom-[20%] '/>
                    </div>

                    <span className='text-white text-xl md:text-2xl font-light font-title z-50 relative top-24'>¿Por qué elegirnos?</span>
         
                    <div className='w-full lg:p-5 flex lg:flex-row flex-col mt-40 justify-center items-center lg:space-y-0 space-y-10 lg:space-x-40 mb-10' >

                        <div className='w-72 h-72  drop-shadow-lg shadow-lg flex flex-col items-center border-gray-500 relative'>
                            <div className='h-full w-full bg-cardPicture1 bg-cover absolute opacity-50'></div>
                            <div className=' w-16 h-16 bg-icono bg-cover text-4xl text-orange-300 '></div>
                            <span className=' mt-0 uppercase text-white font-semibold'>Asesoramiento</span>
                            <p className='sa  text-center text-white mt-2 font-light drop-shadow-lg shadow-blue-600/50'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis dicta nesciunt maxime doloremque obcaecati officia iste reprehenderit eius consequuntur nostrum unde perspiciatis, ratione provident, ex qui. Laboriosam dolor ipsa nostrum.</p>
                        </div>

                        <div className='w-72 h-72  drop-shadow-lg shadow-lg flex flex-col items-center border-gray-500 relative'>
                            <div className='h-full w-full bg-cardPicture3 bg-cover absolute opacity-50'></div>
                            <div className=' w-16 h-16 bg-icono bg-cover text-4xl text-orange-300 '></div>
                            <span className=' mt-0 uppercase text-white font-semibold'>Asesoramiento</span>
                            <p className='sa  text-center text-white mt-2 font-light drop-shadow-lg shadow-blue-600/50'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis dicta nesciunt maxime doloremque obcaecati officia iste reprehenderit eius consequuntur nostrum unde perspiciatis, ratione provident, ex qui. Laboriosam dolor ipsa nostrum.</p>
                        </div>

                        <div className='w-72 h-72  drop-shadow-lg shadow-lg flex flex-col items-center border-gray-500 relative'>
                            <div className='h-full w-full bg-cardPicture2 bg-cover absolute opacity-50'></div>
                            <div className=' w-16 h-16 bg-icono2 bg-cover text-4xl text-orange-300 '></div>
                            <span className=' mt-0 uppercase text-white font-semibold'>Asesoramiento</span>
                            <p className='sa  text-center text-white mt-2 font-light drop-shadow-lg shadow-blue-600/50'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis dicta nesciunt maxime doloremque obcaecati officia iste reprehenderit eius consequuntur nostrum unde perspiciatis, ratione provident, ex qui. Laboriosam dolor ipsa nostrum.</p>
                        </div>

                        
              
            

                    </div>
                  
                   
			     




                </section>
            </div>
        </>
    )

}



