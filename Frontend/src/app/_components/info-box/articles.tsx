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
        if (option == displayInfo?.option){
            setDisplayInfo(null)
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
            <section className="w-full h-full p-4 flex flex-col">


                {articleOptions.option_list.map((option, index) => (
                    <section className="element w-full flex flex-col mb-6">
                    
                        <button key={index} className="shadow1 bg-[#222] text-white md:text-3xl w-full h-16 md:h-24  focus:border-2" onClick={()=>{setOption(option)}}>{option}</button>
                        {displayInfo?.option == option ? 
                        <div className="appear w-full bg-red-500">
                            <p className="">{displayInfo.text}</p>
                        </div>: null}
                        
                    </section>
                ))}

                    
                    
              


            </section>
            


            }
        </section>
        
    )
}