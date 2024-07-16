import { useContext, useEffect, useState } from "react"
import { IArticle, IArticleType, IDisplayData, IDisplayInfo } from "./interfaces/info-box.interfaces"
import InfoBoxServiceContext from "./services/info-box.service"
import { Indemnization } from "../labor/labor-formula"

export default function Articles({section}: IArticleType){

    const infobox_service = useContext(InfoBoxServiceContext)

    const [articles, setArticles] = useState<IArticle[]>([])
    const [articleOptions, setArticleOptions] = useState<IDisplayData | null>(null)
    const [displayInfo, setDisplayInfo] = useState<IDisplayInfo | null>(null)
    const [calculo, setCalculo] = useState<boolean>(false)

    useEffect(()=>{
        console.log("GET!", section)
        getArticles()

        if(articleOptions != null && displayInfo == null){
            setOption("Explicacion")
        }

    },[articleOptions])
    
    const getArticles = async () => {
        // let data: IArticle[] = await infobox_service.getArticles(type)
        let data: IArticle[] = await infobox_service.getArticles(section)
        //await infobox_service.getSelection(section, "MeDespidieron")
        console.log(data)
        setArticles(data)
    }
    
    const getSelection = async (selection: string) => {
        let data = await infobox_service.getSelection(section, selection)
        console.log(data)
        setArticleOptions(data)
    }


    const setOption = (option:string) => {

        if (option == "Cuanto me corresponde"){
            setCalculo(true)
            return
        }

        setCalculo(false)
        let display_info: IDisplayInfo = {
            option: option,
            text: articleOptions?.options[option]
        }

        setDisplayInfo(display_info)
    }
    return (
        <section className="w-full h-full">
            {articleOptions == null ? 
            // SECTION OPTIONS
            <section className="w-full h-full flex flex-col md:grid gap-3 md:grid-cols-3 md:grid-rows-2 grid-cols-1 md:gap-4 lg:gap-10 md:p-4 p-2 items-center justify-center" >
                {articles.map((article, index) => (
                    <div key={index} className="element w-full h-52 md:h-full rounded-2xl flex relative justify-center items-center cursor-pointer " onClick={()=>{getSelection(article.alias)}}>
                        
                        <h2 className='uppercase text-white drop-shadow-xl font-semibold z-10 text-2xl md:text-3xl lg:text-4xl text-center'>{article.title}</h2>
                        <div className={`w-full h-full opacity-60 rounded-2xl absolute`} >
                            <img className='w-full h-full rounded-2xl' src={`/static/${article.imageName}`} alt='logo'></img>
                        </div>
                    </div>

                ))}
            </section>
            :
            // SECTION
            <section className="w-full h-full p-4 flex flex-col gap-5 lg:grid lg:grid-cols-4 ">

                <section className="shadow1 w-full h-full bg-[#222] rounded-lg flex justify-center items-center p-2 lg:col-span-3">
                    <section className="bg-[#191919] rounded-3xl flex justify-center items-center p-5 w-full h-full">
                        {!calculo ? <p className="text-white border-2 rounded-xl text-center lg:p-20 text-lg md:text-4xl opacity-70">{displayInfo?.text}</p> : <Indemnization/>}
                    </section>
                </section>

                <section className="w-full h-full flex flex-col justify-around gap-4 items-center">
                    {articleOptions.option_list.map((option, index) => (
                        <button key={index} className="shadow1 bg-[#222] text-white md:text-3xl w-full h-16 md:h-32 rounded-lg focus:border-2" onClick={()=>{setOption(option)}}>{option}</button>
                    ))}
                </section>
            </section>
            


            }
        </section>
        
    )
}