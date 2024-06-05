import { createContext } from "react";
import { IFormCompensation, ICompensationRequest, IFormError } from "../interfaces/labor.interface";
import { init } from "aos";
import { FormError } from "../enums/labor.enum";


export class LaborService{
 

    processData(data: any){

        const requestData: ICompensationRequest = {
            dates: {
                initial_date: data.initial_date,
                final_date: data.final_date
            },
            status: {
                salary: parseInt(data.salary),
                reason: data.reason,
                noticed: data.noticed === 'true',
                black: data.black === 'true'
            }
        }
        console.log(requestData)
        return requestData

    }
    
    checkData(data: any): [boolean, IFormError]{
        let isValid: boolean = true

        const errors: IFormError = {
            dateError: '',
            salaryError: '',
        }
        
        const initial_date = new Date(data.initial_date)
        const final_date =  new Date(data.final_date)
        

        if(data.initial_date === "" || data.final_date == ""){
            errors.dateError = FormError.EmptyDate
            isValid = false
        }

        if (initial_date > final_date){
            errors.dateError = FormError.InconsistentDates
            isValid = false
        }

        if (data.salary <= 0){
            errors.salaryError = FormError.NegativeSalary
            isValid = false
        }
        
    

        return [isValid, errors]
    }
}

const laborServiceContext = createContext(new LaborService())
export default laborServiceContext
