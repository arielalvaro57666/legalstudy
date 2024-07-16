"use client"
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


//#1d1d1d
    return(
        <>
            <div className='w-full flex flex-col ml-4' >
                <nav className="w-20 h-30 logobg fixed bg-black flex justify-center items-center">
                
                    <div className="">
                        <img className='w-full h-full ' width={20} height={30} src='/static/iconos/logoT.png' alt='logo'></img>

                    </div>

                </nav>

            </div>
        </>
    )

}



