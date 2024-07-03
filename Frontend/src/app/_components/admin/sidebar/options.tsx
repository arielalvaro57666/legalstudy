import './sidebar.css'
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { BsMailbox2Flag } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";

import { useRouter } from "next/navigation"


export default function Options(){
    const router = useRouter()

    const handleOption = (path_name: string = '') => {
        router.push(`/admin/dashboard/${path_name}`)
    }

    return (
      
        <ul className="lista w-full flex flex-col gap-10">
            <li className="flex gap-5 items-center" onClick={()=>{handleOption()}}>
                <IoIosStats className='w-7 h-7 lg:w-10 lg:h-10'/> Inicio
            </li>
            <li className="flex gap-5 items-center" onClick={()=>{handleOption("chat")}}>
                <BsFillChatLeftDotsFill className='w-7 h-7 lg:w-10 lg:h-10'/> Chat online
            </li>
 

        </ul>

    )
}