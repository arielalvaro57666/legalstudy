import './sidebar.css'
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { BsMailbox2Flag } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";

export default function Options(){

    return (
      
        <ul className="lista w-full flex flex-col gap-10">
            <li className="flex gap-5 items-center">
                <IoIosStats className='w-7 h-7 md:w-20 md:h-20'/> Inicio
            </li>
            <li className="flex gap-5 items-center">
                <BsFillChatLeftDotsFill className='w-7 h-7 md:w-20 md:h-20'/> Chat online
            </li>
 

        </ul>

    )
}