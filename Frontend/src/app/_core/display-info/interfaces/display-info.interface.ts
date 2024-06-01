

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

export interface IDisplayInfo{
    title: string
    text: string
    option: string
    options: string[]
}