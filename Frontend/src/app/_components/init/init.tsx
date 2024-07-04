"use client"
import DataServiceContext from "@/app/_core/services/dataService";
import httpRequestContext from "@/app/_core/services/httpRequest";
import { useContext, useEffect } from "react";

export default function Init(){
    const api_service = useContext(httpRequestContext)
    const data_service = useContext(DataServiceContext)
    useEffect(()=>{
        generateVisit()
    },[])

    const generateVisit = async () => {
        const url = data_service.setUrl("register_create")
        const options = api_service.generateOptions(url,{})
        await api_service.request("POST",options)
    }

    return <></>
}