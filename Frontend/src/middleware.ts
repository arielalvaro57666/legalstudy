import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
async function verify_token(){
    const url = 'http://192.168.0.75:8088/api/v1/auth/verify/'

    let settings = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("tkv1")}`
        }
    }

    try{
        const response = await fetch(url, settings)
        
        if(response.ok){
            return true
        }

        return false

    } catch (error){

        console.log(error)
    }


}

export async function  middleware(request: NextRequest) {
    
    // let is_token_valid = await verify_token() 

    // if(! is_token_valid){
    //     return NextResponse.redirect(new URL('/admin/login', request.url))
    // }
    // else{
    //     return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    // }

    
}
 

export const config = {
  matcher: ['/admin/dashboard']
}