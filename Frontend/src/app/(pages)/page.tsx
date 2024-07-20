
// import '../style/home.css'
import React, { useState } from 'react'
import Header from '@/app/_components/header/header'


import ChatBox from '@/app/_components/chat/chat'
import Footer from '@/app/_components/footer/footer'
import Navbar from '@/app/_components/navbar/navbar'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import Chat from '@/app/_components/chat/chat'


import { UserTypeEnum } from '../_components/chat/enums/chat.enum'
import Init from '../_components/init/init'
import Articles from '../_components/info-box/articles'
import InformationBox from '../_components/info-box/information-box'
import { RiWhatsappFill } from "react-icons/ri";


export default function Home() {


    return (
        <div className='bg-[#222] h-screen overflow-scroll'>
            {/*  */}
            <Navbar/>
            <Header/>
            <InformationBox/>
            {/* <RiWhatsappFill className="fixed w-20 h-20 bottom-16 md:w-0 md:h-0"/> */}

            <Chat actual_user={UserTypeEnum.AnonymousUser}/>

            <Footer/>
            <Init/>
        </div>
    )
}

// 
