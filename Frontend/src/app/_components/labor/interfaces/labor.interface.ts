export interface IFormCompensation{
    initial_date: string
    final_date: string
    salary: number 
    reason: string
    noticed: boolean
    black: boolean
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