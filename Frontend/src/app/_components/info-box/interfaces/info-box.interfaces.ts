
export interface IArticleType{
    section: string
}

export interface IArticle{
    title: string
    alias: string
    imageName?: string
}



export interface IRequestDisplayProp{
    displayRequest: IRequestDisplay
}
export interface IOptionProp{
    option: string
    handleChange: (option: string) => void
} 

export interface IRequestDisplay{
    section: string
    selection: string 
}



export interface IDisplayData{
    title: string
    options: any
    option_list: string[]
}


export interface IDisplayInfo{
    option: string
    text: string
}
