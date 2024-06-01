import { IFormCompensation, ICompensationRequest } from "../interfaces/labor.interface";

export class CalculoRequest{
 
    static processData(data: any){

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

        return requestData

    }
    
}