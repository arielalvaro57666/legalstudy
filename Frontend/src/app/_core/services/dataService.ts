import { createContext } from "react"

class DataService{

    url_backend = 'http://0.0.0.0:8088/api/v1/'
    ws_backend = 'ws://0.0.0.0:8088/'


    setUrl(url: string){
        return `${this.url_backend + url}`
    }
}

const DataServiceContext = createContext(new DataService())
export default DataServiceContext