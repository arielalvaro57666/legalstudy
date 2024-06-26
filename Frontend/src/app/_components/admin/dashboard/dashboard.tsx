'use client'

import DataServiceContext from "@/app/_core/services/dataService"
import httpRequestContext from "@/app/_core/services/httpRequest"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

function Dashboard(){


    const data_service = useContext(DataServiceContext)
    const api_service = useContext(httpRequestContext)


    return (
        <>
        </>
    )
}

