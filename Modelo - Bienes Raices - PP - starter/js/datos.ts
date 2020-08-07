export default class DataAcess {
    public id:string;
    public titulo:string;
    public transaccion:string;
    public descripcion:string;
    public precio:string;
    public puertas:string;
    public kms:string;
    public potencia:string;

    constructor(id:string,titulo:string,transaccion:string,descripcion:string,precio:string,puertas:string,kms:string,potencia:string) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
        this.puertas = puertas;
        this.kms = kms;
        this.potencia = potencia;
    }  
}
enum enumTransacciones
{
    Todos = "Todos",
    Alquiler = "Alquiler",
    Ventas = "Venta",
    Permutar = "Permutar"
}
export function CargarSelector()
{
    let sltransaccion = document.getElementById("seleccionado");
    for(let item in enumTransacciones)
    {
        let option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        sltransaccion.appendChild(option);
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
export function TraerIDuLTIMO()
{
    let resultado;
    let dates = localStorage.getItem("datos");
    let dati = JSON.parse(dates);
    for(let i = 0; i<dati.length;i++)
    {
         resultado = dati[i].id;
    }
    return resultado;
}
export function alta(nuevoAnuncio) 
{ 
    let contador1 = 0;
    let det = TraerBaseLocalStorage()
   if(det == null || det == "")
   {
       let datiii = Array();
    let siguiente = 1;
    nuevoAnuncio.id = String(siguiente);
    datiii.push(nuevoAnuncio);
    GuardarBaseLocalStorage(JSON.stringify(datiii));
    //Listar2();
    contador1 = contador1 +1;
   }
   else 
   {
    let ultimo = TraerIDuLTIMO();
    let siguiente = Number(ultimo) +1;
    nuevoAnuncio.id = String(siguiente);
    let datiii = TraerBaseLocalStorage();
    datiii.push(nuevoAnuncio);
    GuardarBaseLocalStorage(JSON.stringify(datiii));
    //Listar2();
   }
}

