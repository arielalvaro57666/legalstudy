import { createContext } from "react"
import { IDisplayInfo, IRequestDisplay } from "../interfaces/display-info.interface"

// Object to handle info texts
class DisplayInfoService{
    
    Data = require('../texts/data.json')

    getTitle(request: IRequestDisplay, option: string): string{
        console.log(request)
        return this.Data[request.section][request.selection].title
    }

    getText(request: IRequestDisplay, option: string): string{


        return this.Data[request.section][request.selection].options[option]
    }

    getOption(option: string){
        if (option === ''){
            return 'Explicacion'
        }

        return option
    }
    
    getOptions(request: IRequestDisplay): string[]{
        return Object.keys(this.Data[request.section][request.selection].options).filter(option => option !== 'Explicacion')
    }

    getData(request: IRequestDisplay, option: string): IDisplayInfo {
        let data: IDisplayInfo = {
            title: this.getTitle(request, option),
            text: this.getText(request, option),
            option: this.getOption(option),
            options: this.getOptions(request)

        }

        return data
    }
    


}

const DisplayServiceContext = createContext(new DisplayInfoService())
export default DisplayServiceContext


/*

el componente sabe que mande una peticion de laboral, y manda una opcion "me quieren despedir" supongamos

Con eso obtengo una lista de opciones con texto, mapeo esa lista de opciones (keys) como botones
y dependiendo de cual presione llame a la funcion getData(opcion) con la opcion que presione


text 

[papa,pepe]

*/