import React, { useEffect, useState } from "react"
import { JsxElement } from "typescript"

//recibe una lista con componentes y simplemente regresa un componente que los mapea
interface Icomponent{
    components: JSX.Element[]
}

export function ComponentMap({components}: Icomponent){



    return (
        <>
            {
                components.map((component, index)=>(
                    <div key={index}>
                        {component}
                    </div>
                ))
            }
        </>
    )
}
