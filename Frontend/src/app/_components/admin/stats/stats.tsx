import Values from "./values";

export default function Stats(){


    return (
        <section className="w-full h-full bg-[#1a1818] rounded-xl flex flex-col ">
           
       
            <div className="w-full h-16 bg-slate-600 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] overflow-hidden flex justify-center items-center">
                <h2 className="text-center text-white text-2xl font-bold">Panel administrativo</h2>
            </div>
   
        
            <Values/>
    
   
        </section>
    )
}
