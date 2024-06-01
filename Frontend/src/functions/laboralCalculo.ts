export const dateDiff = (ingreso:Date, egreso:Date) => {

    let diff = egreso.getTime() - ingreso.getTime();
    let diadiff = diff / (1000 * 60 * 60 * 24);
    return diadiff;
}
export const calculo_antiguedad = (sueldo:number, ingreso:string, egreso: string, motivo: string) => {

    
    const floorDate = new Date(ingreso);
    const roofDate = new Date(egreso);


    const diasTotales = dateDiff(floorDate,roofDate);
   
    let años = Math.floor(diasTotales / 365); // Obtener la parte entera de los años
    let meses = (diasTotales % 365) / 30; // Obtener la parte entera de los meses
    let corresponde: number = 0;
    if(meses >= 3){ // fraccion mayor a 3 meses
        años+=1;
    }

    if(motivo === 'Sin causa'){
        corresponde = años * sueldo 
    }


    return Math.trunc(corresponde)
    
}
export const calculo_sustPreaviso = (sueldo:number, diasTotales: number, motivo: string) => {

    let años = Math.floor(diasTotales / 365); // Obtener la parte entera de los años
    
    let corresponde: number = 0;
    if(motivo === 'Con causa'){
        corresponde = 0;
    }
    else{
        if(años <= 5){ // fraccion mayor a 3 meses
            corresponde+=sueldo;
        }
        else{
            corresponde+=sueldo*2
        }
    }

    
    return Math.trunc(corresponde)
}
export const calculo_diasMes = (sueldo:number, egreso: string) => {
    const endDate = egreso.split('-');
    console.log(parseInt(endDate[2]))
    const corresponde: number = Math.trunc( (sueldo/31) * parseInt(endDate[2]));
    
    return Math.trunc(corresponde)
}

export const calculo_integracionMes = (sueldo:number, egreso: string, motivo:string) => {
    if(motivo==='Con causa'){
        return 0;
    }
 
    const endDate = egreso.split('-');
    // por las dudas usamos datediff en vez de solo el dia de egreso
    const diaEgreso = new Date(parseInt(endDate[0]), parseInt(endDate[1])-1, parseInt(endDate[2])+1) //año/mesEgreso/01 del primer dia
    const ultimoDia = new Date(parseInt(endDate[0]), parseInt(endDate[1]), 0) // año/mesEgreso/30 ultimo dia

    const diasMesTrabajados = dateDiff(diaEgreso,ultimoDia);
    console.log(diaEgreso, ultimoDia, diasMesTrabajados)
    if(diasMesTrabajados<0){
        return 0
    }
    const corresponde: number = Math.trunc((sueldo/30) * diasMesTrabajados);

    return Math.trunc(corresponde)
}
export const calculo_sacPreaviso = (preaviso:number, motivo: string) => {
    let corresponde: number = 0;
    if(motivo === 'Sin causa'){
        corresponde = (8.33*preaviso)/100
    }
    return Math.trunc(corresponde)
}
export const calculo_sacProporcional = (sueldo:number, ingreso:string, egreso: string) =>{

    const startDate = ingreso.split('-');
    const endDate = egreso.split('-');
   


    const mesIngreso = parseInt(startDate[1])
    const mesEgreso = parseInt(endDate[1])
    
    const floorDate = new Date();
    const roofDate = new Date();
    roofDate.setFullYear(parseInt(endDate[0]));
    roofDate.setMonth(parseInt(endDate[1])-1); 
    roofDate.setDate(parseInt(endDate[2]));
    //Si entra en años anteriores entonces no calculamos desde su ingreso
    console.log("sacProporcional start and end date", startDate[0], endDate[0])
    console.log("sacProporcional ingreso y egreso month", mesIngreso, mesEgreso, roofDate)
    if( parseInt(startDate[0]) < parseInt(endDate[0])){

        if(mesEgreso < 7){ // se calcula ebtre inicio1semestre y egreso
            floorDate.setFullYear(parseInt(endDate[0]));
            floorDate.setMonth(0);  // Enero
            floorDate.setDate(1);


        }
        else{ // se calcula entre inicio2semestre y egreso
            floorDate.setFullYear(parseInt(endDate[0]));
            floorDate.setMonth(6); // Julio
            floorDate.setDate(1)
            
        }
    }
    else{ // si es el mismo año necesitamos ver en que semestre esta 
        // caso primer semestre se calcula entre ingreso y egreso
        if(mesIngreso < 7 && mesEgreso < 7){
            floorDate.setFullYear(parseInt(startDate[0]));
            floorDate.setMonth(parseInt(startDate[1])-1);  // Enero
            floorDate.setDate(parseInt(startDate[2]));
        }
        // caso segundo semestre se calcula entre ingreso y egreso
        if(mesIngreso >=7 && mesEgreso >=7){
            floorDate.setFullYear(parseInt(startDate[0]));
            floorDate.setMonth(parseInt(startDate[1])-1);  // Enero
            floorDate.setDate(parseInt(startDate[2]));
        }
        // caso setear inicio segundo semestre // se calcula 2 semestre y egreso
        if(mesIngreso < 7 && mesEgreso >= 7){
            floorDate.setFullYear(parseInt(endDate[0]));
            floorDate.setMonth(6); // Julio
            floorDate.setDate(1)
        }

    }
    
    const diasTrabajadosSemestre = dateDiff(floorDate,roofDate) + 1;
    console.log("sac proporcional floordate y roofdate = ",floorDate, roofDate, diasTrabajadosSemestre)

    // del 25 diciembre al 1 de enero => 6 dias totales no cuenta bien 
    //debo encontrar el dia 25 de diciembre del año =>

    const corresponde: number = ((sueldo/2)/182.5) * diasTrabajadosSemestre;

    return Math.trunc(corresponde)
    
}
export const calculo_vacaciones = (sueldo:number, egreso: string, diasTotales: number) =>{
    const endDate = egreso.split('-');
    const años = Math.floor(diasTotales/365);
    const floorDate = new Date(parseInt(endDate[0]), 0, 1) // First day of the year
    const roofDate = new Date(parseInt(endDate[0]),parseInt(endDate[1]) - 1,parseInt(endDate[2])) // day of exit
    const diasAño = dateDiff(floorDate, roofDate) + 1;
    console.log("vacaciones", floorDate, roofDate, años, diasAño)
    let corresponde: number = 0;
    if(años <= 5){
        corresponde = (diasAño * 14) / 365
    }
    else if(años > 5 && años <= 10){
        corresponde = (diasAño * 21) / 365
    }
    else if(años > 10 && años <= 20){
        corresponde = (diasAño * 28) / 365
    }
    else{
        corresponde = (diasAño * 35) / 365
    }
    corresponde = (sueldo/25) * corresponde;
    
    return Math.trunc(corresponde)
}

export{};
