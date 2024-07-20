import { RiWhatsappFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
export default function Footer(){

    const urls = {
        whatsapp: "https://google.com",
        maps: "https://google.com",
        facebook: "https://google.com",
        mail: "https://google.com"
    }

    return(
        <footer className=" w-full mx-auto bg-black p-5 flex justify-center items-center flex-col lg:p-20 gap-10">
            <section className="w-full lg:w-[40rem] relative">
                <h2 className="text-white text-2xl text-center lg:mt-0 mt-10 lg:text-5xl font-bold">Contactanos</h2>
            </section>
            <section className="flex flex-wrap items-center justify-center gap-5 ">
                <a href="https://google.com" target="_blank" className="w-32 h-36 lg:w-52 lg:h-64 bg-[#1d1d1d] flex flex-col justify-center items-center gap-10 rounded-2xl hover:bg-green-600">
                    <div className="w-20 h-20 bg-[#0e0d0d] flex justify-center items-center rounded-full">
                        <RiWhatsappFill className="w-12 h-12 text-white opacity-50"/>
                        
                    </div>
                    <h2 className="text-white font-bold">+54 9 3512297044</h2>
                </a>
                <a href="https://google.com" target="_blank" className="w-32 h-36 lg:w-52 lg:h-64 bg-[#1d1d1d] flex flex-col justify-center items-center gap-10 rounded-2xl hover:bg-gray-700">
                    <div className="w-20 h-20 bg-[#0e0d0d] flex justify-center items-center rounded-full">
                        <FaLocationDot className="w-12 h-12 text-white opacity-50"/>
                        
                    </div>
                    <h2 className="text-white font-bold">+54 9 3512297044</h2>
                </a>
                <a href="https://google.com" target="_blank" className="w-32 h-36 lg:w-52 lg:h-64 bg-[#1d1d1d] flex flex-col justify-center items-center gap-10 rounded-2xl hover:bg-blue-700">
                    <div className="w-20 h-20 bg-[#0e0d0d] flex justify-center items-center rounded-full">
                        <FaSquareFacebook className="w-12 h-12 text-white opacity-50"/>
                        
                    </div>
                    <h2 className="text-white font-bold">+54 9 3512297044</h2>
                </a>
                <a href="https://google.com" target="_blank" className="w-32 h-36 lg:w-52 lg:h-64 bg-[#1d1d1d] flex flex-col justify-center items-center gap-10 rounded-2xl hover:bg-red-600">
                    <div className="w-20 h-20 bg-[#0e0d0d] flex justify-center items-center rounded-full">
                        <SiGmail className="w-12 h-12 text-white opacity-50"/>
                        
                    </div>
                    <h2 className="text-white font-bold">+54 9 3512297044</h2>
                </a>
            </section>
            <section className="h-[4rem] w-10"></section>

            {/* <div className="flex flex-col w-full justify-center items-center ">
                <img className='w-16 h-10 lg:w-20 lg:h-20' src='/static/iconos/logo.png' alt='logo'></img>
                <h2 className="text-white font-semibold">Estudio Juridico Dario Alvaro</h2>
            </div>
            <section className="h-full flex flex-col ">

                <p className="text-white text- font-light">Figuero Alcorta 823 | 15vo piso puerta D</p>
                <p className="text-white font-light">Córdoba Capital. Argentina.</p>
                <p className="text-white font-light">Tel. (0351) 502 8509 / (0351) 155503602</p>
                <p className="text-white font-light">Horarios Lun. a vie. 08 a 19hs</p>
            </section> */}


            
        </footer>
    )
}
