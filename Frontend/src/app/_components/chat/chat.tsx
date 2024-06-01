'use client'
import { KeyboardEvent, useEffect, useRef, useState } from "react"
import { TextField } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
// import '../style/fontawesome-free-6.4.0-web/css/all.css'
interface messageProp{
    date: string;
    message: string;
}
interface objectComponent {
    index: number;
    component: JSX.Element;
}



export default function Chat(){
    const [hide, setHide] = useState(true)
    const [color, setColor] = useState('black');
    const [MsgArray, setMsgArray] = useState<Array<objectComponent>>([])
    const [messageCount, setMessageCount] = useState<number>(0)
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMobile, setIsMobile] = useState(false);

    const incomingMessageSpawn = (message: string) => {
      setMsgArray(prevMsgArray => {
          const adminMSG = {
              index: messageCount,
              component: <AdminMsg date="10/10" message={message} />
          };
          return [...prevMsgArray, adminMSG];
        });
        setMessageCount(prevMessageCount => prevMessageCount + 1);
    };
    

    useEffect(() => {

        console.log("es",isMobile)
        if(isMobile){
            setHide(!hide)
        }
        let random_id = Math.floor(Math.random() * 200);
    
        fetch_id(random_id)
    
        // Cerrar la conexión WebSocket cuando el componente se desmonte
        return () => {
          if (socket) {
            socket.close();
          }
        };
      }, []);
      const open_websocket = (id:number) =>{
        const room = `ws://127.0.0.1:8000/ws/${id}?type=client`;
        const ws = new WebSocket(room);

        ws.onopen = () => {
            console.log('Conexión establecida');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // Admin sends meesage
            if (message.type === 'admin'){
            incomingMessageSpawn(message.message)
            }
            console.log('Mensaje recibido:', message);
        };

        ws.onclose = () => {
            console.log('Conexión cerrada');
            // Realizar acciones adicionales si la conexión se cierra
        };

        setSocket(ws); // Guardar el objeto WebSocket en el estado
      }
    
      const fetch_id = async(room_id:number) =>{
          let occupied = true
          const url = `http://127.0.0.1:8000/checkID/${room_id}`
          const settings = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          };
          fetch(url,settings)
          .then(res =>{
            if(res.ok){
                open_websocket(room_id)
            }
            else{
                let random_id = Math.floor(Math.random() * 200);
                fetch_id(random_id)
            }
          })
          
      }

    const handleEnter = (e:KeyboardEvent) => {
        if(e.key === "Enter"){
            handleSendMessage()
        }
    }
    const handleSendMessage = () => {
        const message: string = inputRef.current?.value!;
        if(socket && message !== ''){
            sendMessageSpawn(message!);
            socket.send(message);
        }
        //clean input
        if (inputRef.current) {
          inputRef.current.value = '';
        }
    
    };

    const sendMessageSpawn = (message: string) =>{
        const clientMSG = {
            index: messageCount,
            component: <ClientMsg date="10/10" message={message}/>
            
        };
  
        setMsgArray([...MsgArray,clientMSG])
        setMessageCount(messageCount+1); 
        
    }

    return(
        <div className="chat fixed -bottom-[23rem] md:right-5 z-50 md:w-96 w-full">

            <div className="md:h-14 flex justify-between items-center md:w-w-96 h-12 w-full bg-zinc-900 rounded-t-md shadow-sm relative cursor-pointer" onClick={()=>{
				    setHide(!hide)	
			      }}>
                <div className="w-10 h-10 ml-2 rounded-full bg-logo bg-contain bg-no-repeat bg-center bg-black"></div>
                <div className=" w-2 h-2 absolute left-6 top-8 shadow-sm shadow-green-500  ml-4 rounded-full bg-green-600"></div>
                <span className="ml-10 absolute top-3 left-5 text-white opacity-90">Abogado en linea</span>
            </div>
            
            {hide && <div id='chat' className={`${hide ? 'md:h-80 p-4' : 'h-0 p-0'} md:w-96 h-96 bg-zinc-800 shadow-md overflow-y-scroll text-xs flex-1 `}>
            
                {MsgArray.map(({index, component}) => (
                    <div className="flex"
                    key={uuidv4()}>
                        {component}
                    </div>
                ))}

            </div>}
			
            {hide && <div className={`md:h-10 h-10 md:w-96 bg-zinc-900 flex flex-row shadow-sm justify-center items-center relative space-x-5`}>
                <input className="text-white opacity-80 focus:border-solid focus:border-2 focus:border-zinc-900 bg-zinc-800 outline-none p-1 text-sm absolute left-2 rounded-md w-4/5" ref={inputRef} onKeyDown={handleEnter}></input>
                <i className="fa-solid fa-square-caret-right absolute text-zinc-800 text-2xl right-5 cursor-pointer hover:text-stone-100" onClick={handleSendMessage}></i>
                    
            </div>}
        </div>

    )
}


function AdminMsg(prop:messageProp){
    return(
        <> 
            <div className="flex w-2/3 justify-start mb-4 text-white">
                <p className="p-2 bg-zinc-900 inline-block rounded-md opacity-80">{prop.message}</p>
            </div>   
        </>
    )
}
function ClientMsg(prop:messageProp){
    return(
        <>
            <div className="w-full flex justify-end">
                <div className="flex w-2/3 justify-end mb-4 text-white">
                    <p className="p-2 bg-zinc-900 inline-block rounded-md opacity-80">{prop.message}</p>
                </div>
            </div>
        </>
    )
}
