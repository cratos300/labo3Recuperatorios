import {Listar2,alta,baja,modificacion,cik} from "./xhr.js"
import {crearTabla} from "./tableheper.js"
import anu from "./datos.js"
import {CargarSelector} from "./datos.js"
export let frm;
let eliminar;
let modificar;
export let agregar;
let cancelar;
let selector;
export var terere = 0;
let bandera  = false;
let contador1 = 0;
export var  baa  =  false;
export let traican = 0;
$(inicializarManejadores);
function inicializarManejadores() { 
    CargarSelector();
    let revi = TraerBaseLocalStorage()
    if(revi == null)
    {
        localStorage.setItem("datos", "[]");
    }
    document.getElementById("promedio").value = "N/A";
    DesaSelec(); 
    ContadorCheckbox();
    DesabilitarCheckbox();
    frm = document.forms[0];
    leerLocalStorage();
    modificar = document.getElementById("modificar");

    cancelar = document.getElementById("cancelar");
    selector = document.getElementById("tipo");
    $("#cancelar").on("click", function () {
        agregar.className = "visible";
        eliminar.className = 'oculto';
        modificar.className = 'oculto';
        cancelar.className = 'oculto';
        selector.selectedIndex = "0";
    })

    //verificar que estemos apuntando al formulario correcto
    eliminar = document.getElementById('eliminar');
    frm.addEventListener('submit', manejadorSubmit);
    agregar = document.getElementById('alta');

    $("#modificar").on("click", function () {
        let nuevoAnuncio = crearAnuncio(frm);
        modificacion(nuevoAnuncio);
        cancelar.className = 'oculto';
        eliminar.className = 'oculto';
        modificar.className = 'oculto';
        agregar.className = "visible";
        limpiar();

    })

    $("#eliminar").on("click", manejadoraBorrar);

    //agregar.addEventListener('click',manejadorAlta);

    //atrapar el evento submint del formularios//cuando se produsca el submit ejecuta la funcions
    Listar2();
    $("#alta").on("click", manejadorAlta);
}
export function manejadoraBorrar(e) {
    SeterLocalStorage();
    DesabilitarCheckbox(); 
    let nuevoAnuncio = crearAnuncio(frm);
    baja(nuevoAnuncio);
    eliminar.className = 'oculto';
    modificar.className = 'oculto';
    agregar.className = "visible";
    cancelar.className = 'oculto';
    limpiar();
}

export function crearAnuncio(frm) {
    let titulo;
    let transaccion;
    let descripcion;
    let precio;
    let baños;
    let estacionamiento;
    let dormitorio;
    let id;
    for (let elemento of frm.elements) {
        switch (elemento.name) {
            case "frmTitulo":
                titulo = elemento.value;
                break;
            case "frmDescripcion":
                descripcion = elemento.value;
                break;
            case "frmPrecio":
                precio = elemento.value;
                break;
            case "frmNum_baño":
                baños = elemento.value;
                break;
            case "frmNum_estacionamiento":
                estacionamiento = elemento.value;
                break;
            case "frmNum_dormitorio":
                dormitorio = elemento.value;
                break;
            case "tipo":
                transaccion = elemento.value;
                break;
            case "id":
                id = elemento.value;
            default:
                break;
        }
    }
    let dar = new anu(id, titulo, transaccion, descripcion, precio, baños, estacionamiento, dormitorio);
    return dar;

}
 export function CargarFormulario(frm, obj) {
    for (let elemento of frm.elements) {
        switch (elemento.name) {
            case "frmTitulo":
                elemento.value = obj.titulo;
                break;
            case "frmDescripcion":
                elemento.value = obj.descripcion;
                break;
            case "frmPrecio":
                elemento.value = obj.precio;
                break;
            case "frmNum_baño":
                elemento.value = obj.puertas;
                break;
            case "frmNum_estacionamiento":
                elemento.value =  obj.kms;
                break;
            case "frmNum_dormitorio":
                elemento.value = obj.potencia;
                break;
            case "tipo":
                if (obj.transaccion == "Venta") {
                    elemento.selectedIndex = "0";
                }
                else if (obj.transaccion == "Alquiler") {
                    elemento.selectedIndex = "1";
                }
                else {
                    elemento.selectedIndex = "2";
                }
                break;
            case "id":
                elemento.value = obj.id;
                break;
            default:
                break;
        }
    }
}
export function Spinner() {
    var spinner = document.createElement('img');
    spinner.setAttribute('src', './img/208.gif');
    spinner.setAttribute('alt', 'spinner');
    return spinner;
}
export function manejadorAlta(e) {

    DesabilitarCheckbox(); 
    let nuevoAnuncio = crearAnuncio(frm);
    limpiar();
    alta(nuevoAnuncio);
}
export function manejadorSubmit(e) {
    e.preventDefault();
}
export function limpiar() {
    let recorrer = document.getElementsByTagName("input");

    for (let i = 0; i < recorrer.length; i++) {
        recorrer[i].value = "";
    }
}
/*function Manejadora(e)
{
    console.log(e.target.parentElements);
    let anuncio = new Anuncio(nodes[0].textContent, nodes[1].textContent, nodes[2].textContent,
        nodes[3].textContent, nodes[4].textContent, nodes[5].textContent, nodes[6].textContent,
        nodes[7].textContent);
}*/

/*$("#modificar").on("click", function() {
        let nuevoAnuncio = crearAnuncio(frm); 
        console.log(nuevoAnuncio);
        modificacion(nuevoAnuncio);
        cancelar.className = 'oculto';
        eliminar.className = 'oculto';
        modificar.className = 'oculto';
        agregar.className = "visible";
        
    })*/
 export function manejadorCheckbox(datos) {
    for (let i = 0; frm.elements[i]; i++) {
        if (frm.elements[i].type == 'checkbox') {
            frm.elements[i].addEventListener("click", function () {
                //SeterLocalStorage();
                let seleccionados = [];
                for (let i = 0; frm.elements[i]; i++) {
                    if (frm.elements[i].type == 'checkbox') {
                        if (!frm.elements[i].checked) {
                            seleccionados.push(frm.elements[i].name);
                        }
                    }
                }
                Realizar(seleccionados,datos);
            })
        }
    }
}
export function Realizar(seleccionados,datos)
{
    let transaccion =  null;
    let descripcion = null;
    let general = null;
    let precio = null;
    let puertas = null;
    let km = null;
    let potencia = null;
    let titulo = null;
    let id = null;
    let nuevoArray;
    id = datos.map(dar => dar.id);
    for(let i =0; i<seleccionados.length; i++)
    {
        //tengo que hacer varios if con cada una de las opciones y meter adentor esto por que no hay otra forma
        if(seleccionados[i] == "transaccion")
        {
            transaccion = datos.map(dato=>dato.transaccion); 
        }
        else if(seleccionados[i] == "descripcion"){
            descripcion = datos.map(dato=>dato.descripcion);
        }
        else if(seleccionados[i] == "precio"){
            precio = datos.map(dato=>dato.precio);
        }
        else if(seleccionados[i] == "puertas"){
            puertas = datos.map(dato=>dato.puertas);
        }
        else if(seleccionados[i] == "kms"){
            km = datos.map(dato=>dato.kms);
        }
        else if(seleccionados[i] == "potencia"){
            potencia = datos.map(dato=>dato.potencia);
        }
        else if(seleccionados[i] == "titulo"){
            titulo = datos.map(dato=>dato.titulo);
        }
        else if(seleccionados[i] == "id"){
            id = datos.map(dato=>dato.id);
        }
    }
    general = Array();
        for(let i = 0; i<id.length;i++)
        {
            let objetos = new Object();
            objetos.id = id[i];
            
            if(transaccion!=null)
            {
                objetos.transaccion = transaccion[i];
            }
            if(titulo != null)
            {
                objetos.titulo = titulo[i];
            }
            if(descripcion != null)
            {
                objetos.descripcion = descripcion[i]
            }
            if(precio != null)
            {
                objetos.precio = precio[i]
            }
            if(puertas != null)
            {
                objetos.puertas = puertas[i]
            }
            if(km!= null)
            {
                objetos.kms = km[i]
                
            }
            if(potencia != null)
            {
                objetos.potencia = potencia[i]
            }
            general.push(objetos);
        }
        console.log("holaAaaa");
        document.getElementById("tabla").innerText = "";
        document.getElementById('tabla').appendChild(crearTabla(general));
        let td = document.getElementsByTagName('td');   
        for(let i=0;i<td.length;i++)
        {
            td[i].addEventListener('click',function(e){
                let tin = cik()
                if(tin == 7)
                {
                    console.log("asda");
                    let esa = e.target.parentElement;
                    let nodes = esa.childNodes;
                    let anuncio = new anu(nodes[0].textContent, nodes[2].textContent,nodes[1].textContent,
                        nodes[3].textContent, nodes[4].textContent, nodes[5].textContent, nodes[6].textContent,
                        nodes[7].textContent);
                        CargarFormulario(frm,anuncio);
                        eliminar.className = 'visible';
                        eliminar.className = "btn btn-success";
                        modificar.className = 'visible';
                        modificar.className = "btn btn-primary";
                        cancelar.className = 'visible';
                        cancelar.className = "btn btn-danger";
                        agregar.className = 'oculto';
                }
                else
                {
                   
                        alert("Por cuestiones de seguridad destilda TODOS los checkboxs");
                        
                    
                }
            });
     }

        
    
}
export function manejarINICIO(datos) {
    let contador = 0;
            let date = document.getElementsByTagName("input");
             let seleccionados = Array();
                for (let i = 0;i<date.length; i++) {
                    if(date[i].type == "checkbox"){
                        if (!date[i].checked) {
                            seleccionados.push(date[i].name);
                        }
                    }
                }
                
                //console.log(seleccionados);
                Realizar(seleccionados,datos);
            }

export function SeterLocalStorage()
{
    let check = document.getElementsByTagName("input");
    let arr = Array();
    for(let i =0; i<check.length;i++)
    {
        if(check[i].type == "checkbox")
        {
            if(check[i].checked == true)
            {
                arr.push(check[i].name)
            }
        }
    }
    localStorage.setItem("checkbox", arr);
}
export function leerLocalStorage()
{
    let arra  = Array();
    let datos = localStorage.getItem("checkbox");
    if(datos != null)
    {
    arra = datos.split(",");
    for(let i = 0; i<arra.length;i++)
    {
        if(arra[i] == "transaccion")
        {
            document.getElementById("transaccion").checked = true;
        }
        else if(arra[i] == "titulo")
        {
            document.getElementById("titulo").checked = true;
        }
        else if(arra[i] == "puertas")
        {
            document.getElementById("puertas").checked = true;
        }
        else if(arra[i] == "precio")
        {
            document.getElementById("precio").checked = true;
        }
        else if(arra[i] == "descripcion")
        {
            document.getElementById("descripcion").checked = true;
        }
        else if(arra[i] == "kms")
        {
            document.getElementById("kms").checked = true;
        }
        else if(arra[i] == "potencia")
        {
            document.getElementById("potencia").checked = true;
        }
    }
}
}
export function DesabilitarCheckbox()
{
    let check = document.getElementsByTagName("input");
    for(let i = 0; i<check.length;i++)
    {
        if(check[i].type == "checkbox")
        {
            check[i].disabled  =  true;
        }
    }
}
export function HabilitarCheckbox()
{
    let check = document.getElementsByTagName("input");
    for(let i = 0; i<check.length;i++)
    {
        if(check[i].type == "checkbox")
        {
            check[i].disabled  =  false;
        }
    }
}
export function FiltrarTransaccion(datos,filtrar)
{
   let todoss;
   let promedio;
   let acumulador = 0;
   let maximoActual = 0;
   let minimoActual = 0;
   let MINIMO = 0;
   let promPotencia;
   let acumuladorPotencia;

    if(filtrar == "Venta")
    {   
        let flag = true;
        let respuesta = Array();
         respuesta = datos.filter(elemento => (elemento.transaccion == "Venta"));
         let referencia = document.getElementById("seleccionado");
         manejadorCheckbox(respuesta,"Venta");
         document.getElementById("tabla").innerText = "";
         document.getElementById('tabla').appendChild(crearTabla(respuesta));
         let td = document.getElementsByTagName('td'); 
         for(let i=0;i<td.length;i++)
         {
             td[i].addEventListener('click',function(e){
                 let tin = cik()
                 console.log(tin);
                 if(tin == 7)
                 {
                     console.log("asda");
                     let esa = e.target.parentElement;
                     let nodes = esa.childNodes;
                     let anuncio = new anu(nodes[0].textContent, nodes[1].textContent,nodes[2].textContent,
                         nodes[3].textContent, nodes[4].textContent, nodes[5].textContent, nodes[6].textContent,
                         nodes[7].textContent);
                         CargarFormulario(frm,anuncio);
                         eliminar.className = 'visible';
                         eliminar.className = "btn btn-success";
                         modificar.className = 'visible';
                         modificar.className = "btn btn-primary";
                         cancelar.className = 'visible';
                         cancelar.className = "btn btn-danger";
                         agregar.className = 'oculto';
                 }
             });
      }
         acumulador = respuesta.reduce((prev,actual)=>{
             return (Number(prev)+Number(actual.precio))}
             ,0);
             acumuladorPotencia = respuesta.reduce((prev,actual)=>{
                return (Number(prev)+Number(actual.potencia))}
                ,0);
             promedio = acumulador / respuesta.length;
              let promPotencia = acumuladorPotencia / respuesta.length;
             respuesta.reduce((prev,actual)=>{
                if(Number(actual.potencia) > Number(maximoActual)  || flag == true)
                {
                    maximoActual = actual.potencia
                }
                 if(Number(actual.potencia) < Number(minimoActual) || flag == true)
                {
                    minimoActual = actual.potencia
                    flag  = false;
                }
                return actual.potencia}
                ,0);
            document.getElementById("MAXIMO").value = maximoActual;
            document.getElementById("MINIMO").value = minimoActual;
            document.getElementById("promedio").value = promedio;
            document.getElementById("PROMPOTENCIA").value = promPotencia;
    }
    else if(filtrar == "Alquiler")
    {
        let flag = true;
        let respuesta = Array();
         respuesta = datos.filter(elemento => (elemento.transaccion == "Alquiler"));
         let referencia = document.getElementById("seleccionado");
         manejadorCheckbox(respuesta,"Venta");
         document.getElementById("tabla").innerText = "";
         document.getElementById('tabla').appendChild(crearTabla(respuesta));
         let td = document.getElementsByTagName('td'); 
         for(let i=0;i<td.length;i++)
         {
             td[i].addEventListener('click',function(e){
                 let tin = cik()
                 console.log(tin);
                 if(tin == 7)
                 {
                     console.log("asda");
                     let esa = e.target.parentElement;
                     let nodes = esa.childNodes;
                     let anuncio = new anu(nodes[0].textContent, nodes[1].textContent,nodes[2].textContent,
                         nodes[3].textContent, nodes[4].textContent, nodes[5].textContent, nodes[6].textContent,
                         nodes[7].textContent);
                         CargarFormulario(frm,anuncio);
                         eliminar.className = 'visible';
                         eliminar.className = "btn btn-success";
                         modificar.className = 'visible';
                         modificar.className = "btn btn-primary";
                         cancelar.className = 'visible';
                         cancelar.className = "btn btn-danger";
                         agregar.className = 'oculto';
                 }
             });
      }
         acumulador = respuesta.reduce((prev,actual)=>{
             return (Number(prev)+Number(actual.precio))}
             ,0);
             acumuladorPotencia = respuesta.reduce((prev,actual)=>{
                return (Number(prev)+Number(actual.potencia))}
                ,0);
             promedio = acumulador / respuesta.length;
              let promPotencia = acumuladorPotencia / respuesta.length;
             respuesta.reduce((prev,actual)=>{
                if(Number(actual.potencia) > Number(maximoActual)  || flag == true)
                {
                    maximoActual = actual.potencia
                }
                 if(Number(actual.potencia) < Number(minimoActual) || flag == true)
                {
                    minimoActual = actual.potencia
                    flag  = false;
                }
                return actual.potencia}
                ,0);
            document.getElementById("MAXIMO").value = maximoActual;
            document.getElementById("MINIMO").value = minimoActual;
            document.getElementById("promedio").value = promedio;
            document.getElementById("PROMPOTENCIA").value = promPotencia;
    }
    else if(filtrar == "Permutar")
    {   
        let flag = true;
        let respuesta = Array();
         respuesta = datos.filter(elemento => (elemento.transaccion == "Permutar"));
         let referencia = document.getElementById("seleccionado");
         manejadorCheckbox(respuesta,"Venta");
         document.getElementById("tabla").innerText = "";
         document.getElementById('tabla').appendChild(crearTabla(respuesta));
         let td = document.getElementsByTagName('td'); 
         for(let i=0;i<td.length;i++)
         {
             td[i].addEventListener('click',function(e){
                 let tin = cik()
                 console.log(tin);
                 if(tin == 7)
                 {
                     console.log("asda");
                     let esa = e.target.parentElement;
                     let nodes = esa.childNodes;
                     let anuncio = new anu(nodes[0].textContent, nodes[1].textContent,nodes[2].textContent,
                         nodes[3].textContent, nodes[4].textContent, nodes[5].textContent, nodes[6].textContent,
                         nodes[7].textContent);
                         CargarFormulario(frm,anuncio);
                         eliminar.className = 'visible';
                         eliminar.className = "btn btn-success";
                         modificar.className = 'visible';
                         modificar.className = "btn btn-primary";
                         cancelar.className = 'visible';
                         cancelar.className = "btn btn-danger";
                         agregar.className = 'oculto';
                 }
             });
      }
         acumulador = respuesta.reduce((prev,actual)=>{
             return (Number(prev)+Number(actual.precio))}
             ,0);
             acumuladorPotencia = respuesta.reduce((prev,actual)=>{
                return (Number(prev)+Number(actual.potencia))}
                ,0);
             promedio = acumulador / respuesta.length;
              let promPotencia = acumuladorPotencia / respuesta.length;
             respuesta.reduce((prev,actual)=>{
                if(Number(actual.potencia) > Number(maximoActual)  || flag == true)
                {
                    maximoActual = actual.potencia
                }
                 if(Number(actual.potencia) < Number(minimoActual) || flag == true)
                {
                    minimoActual = actual.potencia
                    flag  = false;
                }
                return actual.potencia}
                ,0);
            document.getElementById("MAXIMO").value = maximoActual;
            document.getElementById("MINIMO").value = minimoActual;
            document.getElementById("promedio").value = promedio;
            document.getElementById("PROMPOTENCIA").value = promPotencia;
    }
    else
    {
        todoss = datos;
        manejadorCheckbox(todoss,"Venta");
        document.getElementById("tabla").innerText = "";
        document.getElementById('tabla').appendChild(crearTabla(datos));
        document.getElementById("promedio").value = "N/A";
    }
    return todoss;
}
export function DesaSelec()
{
    let selec = document.getElementById("seleccionado");
    selec.disabled = true;
}
export function HabiSelec()
{
    let selec = document.getElementById("seleccionado");
    selec.disabled = false;
}
export function ContadorCheckbox()
{
    let contador = 0;
    let dat = document.getElementsByTagName("input");
    for(let i = 0; i<dat.length;i++)
    {
        if(dat[i].type == "checkbox")
        {
            dat[i].addEventListener("click",function(){
                for(let i = 0; i<dat.length;i++)
                {
                    DesaSelec();
                    if(dat[i].type == "checkbox")
                    {
                        if (!dat[i].checked) 
                        {
                            contador++;   
                        }
                    }
                }
                if(contador == 7)
                {
                    HabiSelec();
                }
                contador = 0;
            })
        }
    }

}
export function GuardarBaseLocalStorage($datos)
{
    localStorage.setItem("datos", $datos);
}
export function TraerBaseLocalStorage()
{
    let dates = localStorage.getItem("datos");
    return JSON.parse(dates);
    
}
export function Primera()
{
    let retorno = 0;
    if (baa == false)
    {
        baa = true;
    }
    else{
        retorno = 1;
    }
    return retorno;

}
export function primero() {
    for (let i = 0; frm.elements[i]; i++) {
        if (frm.elements[i].type == 'checkbox') {
            frm.elements[i].addEventListener("click", function () {
                SeterLocalStorage();
            })
        }
    }
}
