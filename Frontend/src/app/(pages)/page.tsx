
// import '../style/home.css'
import React, { useState } from 'react'
import Header from '@/app/_components/header/header'
import Laboral from '@/app/_components/labor/labor'
import Civil from '@/app/_components/civil/civil'

import ChatBox from '@/app/_components/chat/chat'
import Footer from '@/app/_components/footer/footer'
import Navbar from '@/app/_components/navbar/navbar'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Family from '@/app/_components/family/Familiar'
import Chat from '@/app/_components/chat/chat'

import { ComponentMap } from '@/app/_core/component-map/component-map'
import { UserTypeEnum } from '../_components/chat/enums/chat.enum'





export default function Home() {


    return (
        <div className='bg-[#222]'>
            {/*  */}
            <Navbar/>
            <Header/>
          
            <div className='container mx-auto bg-[#222]'>
         
                <Laboral/>
                <Civil/>
                <Family/> 
                
                
            </div>

            <Chat actual_user={UserTypeEnum.AnonymousUser}/>

            <Footer/>

        </div>
    )
}

// 
