import { createContext } from "react";
import { IArticle, IDisplayData, IDisplayInfo } from "../interfaces/info-box.interfaces";
import { InformationTypeEnum } from "../enums/infobox.enum";



class InfoBoxService{

    async getData(type:string): Promise<IArticle[] | any>{
        let settings: any = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
  
        try{
            const response = await fetch(`/static/texts/${type}.json`, settings)
            const data = await response.json()
            
            // return [status,data]
            return data
    
        } catch (error){
            //return [500, { error: 'Internal Server Error' }];
            return {status: 500, data: undefined}
            
        }
    }

    async getArticles(section: string): Promise<IArticle[]>{
        const articles = await this.getData(InformationTypeEnum.section)
        console.log(articles[section])
        return articles[section]
    }

    async getOption(display_data: IDisplayData, option: string){

        let display_info: IDisplayInfo = {
            option: option,
            text: display_data.options[option]
        }

        return display_info
    }

    async getSelection(section: string, selection: string){
        const data = await this.getData(InformationTypeEnum.selection)
        const info = data[section][selection]

        return  {title: info.title, options: info.options, option_list: Object.keys(info.options)}
    }
    
    // getTitle(request: IRequestDisplay, option: string): string{
    //     console.log(request)
    //     return this.Data[request.section][request.selection].title
    // }

    // getText(request: IRequestDisplay, option: string): string{


    //     return this.Data[request.section][request.selection].options[option]
    // }

    // getOption(option: string){
    //     if (option === ''){
    //         return 'Explicacion'
    //     }

    //     return option
    // }
    
    // getOptions(request: IRequestDisplay): string[]{
    //     return Object.keys(this.Data[request.section][request.selection].options).filter(option => option !== 'Explicacion')
    // }

    // getDataa(request: IRequestDisplay, option: string): IDisplayInfo {
    //     let data: IDisplayInfo = {
    //         title: this.getTitle(request, option),
    //         text: this.getText(request, option),
    //         option: this.getOption(option),
    //         options: this.getOptions(request)

    //     }

    //     return data
    // }
    

}

const InfoBoxServiceContext = createContext(new InfoBoxService)

export default InfoBoxServiceContext