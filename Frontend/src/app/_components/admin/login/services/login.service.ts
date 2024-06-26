import { createContext } from "react";
import { IRequestUser } from "../interfaces/login.interface";

class LoginService{
    processData(username: string, password: string): IRequestUser{
        const requestData: IRequestUser = {
            username: username,
            password: password
        }

        return requestData

    }
}

const loginServiceContext = createContext(new LoginService())

export default loginServiceContext