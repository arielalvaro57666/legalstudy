"use client"
// import '../style/home.css'
import React, { useState } from 'react'
import Header from '../../_components/header/header'
import Laboral from '../../_components/labor/labor'
import Civil from '../../_components/civil/civil'

import ChatBox from '../../_components/chat/chat'
import Footer from '../../_components/footer/footer'
import Navbar from '@/app/_components/navbar/navbar'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Family from '@/app/_components/family/Familiar'
import Chat from '../../_components/chat/chat'

import { ComponentMap } from '@/app/_core/component-map/component-map'





export default function Home() {
    const [chatOpen, setChatOpen] = useState(false);


    const openChat = () => {
        setChatOpen(!chatOpen);
    }

    return (
        <div className='bg-[#222]'>
            {/*  */}
            <Navbar/>
            <Header chat={openChat}/>
          
            <div className='container mx-auto bg-[#222]'>
                <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs}>
                    <Laboral/>
                </LocalizationProvider>
                <Civil/>
                <Family/> 
                
                
            </div>

            <Chat/>
            {/* {chatOpen && <ChatBox closeChat={openChat}/>} */}
            {/* <Chat/> */}
            <Footer/>

        </div>
    )
}

// 
