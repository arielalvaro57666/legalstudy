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

        <nav className="logobg ml-4 w-12 h-12 lg:h-24 lg:w-20 fixed z-50 bg-black flex justify-center items-center">

            <img className='w-10 h-10 lg:w-16 lg:h-16' src='/static/iconos/logo.png' alt='logo'></img>
        </nav>


    )

}



