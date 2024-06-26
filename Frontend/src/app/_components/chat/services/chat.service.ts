import { createContext } from "react";
import { v4 as uuidv4 } from "uuid"

class ChatService{

    generateUUID(){
 
        if (localStorage.getItem("chat_uuid") === null){

            localStorage.setItem("chat_uuid", uuidv4())
        }
    }
}

const chatServiceContext = createContext(new ChatService())

export default chatServiceContext