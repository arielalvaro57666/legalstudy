

export interface ICompensationResultsProp{
    results: ICompensationResponse | null
}

export interface ICompensationFormProp{
    handleResults: (results: ICompensationResponse) => void
}

export interface IFormError{
    dateError: string,
    salaryError: string
}

export interface IFormCompensation{
    initial_date: string
    final_date: string
    salary: number 
    reason: string
    noticed: boolean
    black: boolean
}
export interface ICompensationResponse{
    antiquity: number
    dayMonth: number 
    monthIntegration: number
    proportionalSac: number
    holiday: number
    noticedSust: number
    noticedSac: number
    total: number
}

export interface ICompensationRequest{
    dates: IDates
    status: IStatus
}

interface IDates{
    initial_date: string
    final_date: string

}
interface IStatus{
    salary: number 
    reason: string
    noticed: boolean
    black: boolean
}