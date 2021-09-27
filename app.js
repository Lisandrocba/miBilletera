let ingresos = [];

let egresos = []

let cargarApp = () =>{
    cargarDatos();
    cargarIngresos();
    cargarEgresos();
}

let calcularIngresos = () =>{
    let totalIngresos = 0;
    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

let calcularEgresos =()=>{
    let totalEgresos = 0;
    for (let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

let cargarDatos = () =>{
    let total = 0;
    total = calcularIngresos() - calcularEgresos();
    document.getElementById("total").innerHTML = formatoMoneda(total);
    document.getElementById("totalIngresos").innerHTML = formatoMoneda(calcularIngresos());
    document.getElementById("totalEgreso").innerHTML = `- ${formatoMoneda(calcularEgresos())}`;
}

const formatoMoneda = (valor) =>{
   return valor.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits:2})
}

let cargarIngresos = () =>{
    let ingresosHTML = "";
    for (let ingreso of ingresos){
        ingresosHTML += cadenaIngresos(ingreso);
    }
    document.getElementById("listaIngreso").innerHTML = ingresosHTML;
}

let cadenaIngresos = (ingreso) =>{
    let ingresoHTML = `
    <div class="contFila">
    <div class="fila">
      <div>${ingreso.descripcion}</div>
      <div>${formatoMoneda(ingreso.valor)}</div>
    </div>
    <button class="iconoCerrar"><ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.idIngresos})"></ion-icon></button>
 </div>
    `;
    return ingresoHTML;
}

let eliminarIngreso = (id) =>{
    let filaEliminar = ingresos.findIndex(ingreso => ingreso.idIngresos === id);
    ingresos.splice(filaEliminar, 1);
    cargarDatos();
    cargarIngresos();
}

let cargarEgresos = ()=>{
    let egresosHTML = "";
    for(let egreso of egresos){
        egresosHTML += cadenaEgresos(egreso);
    }
    document.getElementById("listaEgresos").innerHTML = egresosHTML;
}

let cadenaEgresos = (egreso) =>{
    let egresoHTML = `
    <div class="contFila">
            <div class="fila">
              <div>${egreso.descripcion}</div>
              <div>${formatoMoneda(egreso.valor)}</div>
            </div>
            <button class="iconoCerrar"><ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.idEgresos})"></ion-icon></button>
        </div>
    `;
    return egresoHTML;
}

let eliminarEgreso = (id) =>{
    let filaEliminar = egresos.findIndex(egreso => egreso.idEgresos === id);
    egresos.splice(filaEliminar, 1);
    cargarDatos();
    cargarEgresos();
}

let agregarValor = () =>{
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripciones = forma["descripcion"];
    let valores = forma["valor"];
    if(descripciones.value != "" && valores.value != ""){
        if(tipo.value === "ingreso"){
            ingresos.push(new Ingresos(descripciones.value, +valores.value))
            cargarDatos();
            cargarIngresos();
        }
        else{
            egresos.push(new Egresos(descripciones.value, +valores.value))
            cargarDatos();
            cargarEgresos();
        }
    }

}