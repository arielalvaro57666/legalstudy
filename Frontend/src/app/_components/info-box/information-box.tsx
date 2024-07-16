"use client"
import { useState } from "react";
import Articles from "./articles";
import { SectionEnum } from "./enums/infobox.enum";



export default function InformationBox(){

    const [section, setSection] = useState<string>(SectionEnum.Laboral)
    const [switcher, setSwitcher] = useState<any>(false)

    const changeSection = (section: string) => {
        setSection(section)
        setSwitcher(!switcher)
    }

    return (
        <section className="flex flex-col bg-[#1d1d1d] justify-center items-center ">
            <div className='titleBox p-4 bg-[#141414] text-black '>

                <h1 className='lg:text-6xl text-white text-4xl text-center uppercase font-semibold'>situaciones frecuentes</h1>
            </div>
            <section className="w-full p-4 md:p-10 flex justify-center">
                <section className="w-full h-full lg:h-[60rem] bg-[#1d1d1d] rounded-lg flex flex-col items-center md:p-4 max-w-[90rem]" >
                    {/* Button types */}
                    <div className="shadow1 w-96 h-10 lg:h-[3.5rem] bg-zinc-800 flex flex-grow rounded-lg" >
                        
                        <button className=" text-white h-full border-zinc-600 grow border-r-2 border-l-2 rounded-l-lg hover:bg-blue-600 focus:bg-blue-600" onClick={()=>{changeSection(SectionEnum.Laboral)}}>LABORAL</button>
                        <button className=" text-white h-full border-zinc-600 grow border-r-2 hover:bg-blue-600 focus:bg-blue-600" onClick={()=>{changeSection(SectionEnum.Civil)}}>CIVIL</button>
                        <button className=" text-white h-full border-zinc-600 grow border-r-2 rounded-r-lg hover:bg-blue-600 focus:bg-blue-600" onClick={()=>{changeSection(SectionEnum.Familiar)}}>FAMILIAR</button>

                    </div>

            
                    <Articles key={switcher} section={section}/>
        

                </section>
            </section>
        </section>
    )
}