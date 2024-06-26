import { createContext } from "react"

class DataService{

    url_backend = 'http://localhost:8000/api/v1/'
    ws_backend = 'ws://192.168.0.75:8088/ws/chat'

    
    setUrl(url: string){
        return `${this.url_backend + url}`
    }
}

const DataServiceContext = createContext(new DataService())
export default DataServiceContext