import {Spinner,HabilitarCheckbox,HabiSelec,manejarINICIO,manejadorCheckbox,TraerBaseLocalStorage,GuardarBaseLocalStorage,DesabilitarCheckbox,FiltrarTransaccion,CargarFormulario,frm,agregar, DesaSelec, Primera,primero} from "./index.js"
import {crearTabla} from "./tableheper.js"
import anu from "./datos.js"
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
    Listar2();
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
    Listar2();
   }
}
 export function baja(nuevoAnuncio) 
{ 
    let auxArray = Array();
    let datos = TraerBaseLocalStorage()
    for(let i=0;i<datos.length;i++)
    {
        if(datos[i].id == nuevoAnuncio.id)
        {
        }
        else
        {
            auxArray.push(datos[i]);
        }
    }
    GuardarBaseLocalStorage(JSON.stringify(auxArray));
    Listar2();
}
 export function modificacion(nuevoAnuncio) 
{ 
    let auxArray = Array();
    let datos = TraerBaseLocalStorage()
    for(let i=0;i<datos.length;i++)
    {
        if(datos[i].id == nuevoAnuncio.id)
        {
            datos[i] = nuevoAnuncio;
            break;
        }
    }
    GuardarBaseLocalStorage(JSON.stringify(datos));
    Listar2();
}
 export function Listar()
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange =()=>{
        //aca va el codigo que maneja la peticion
        if(xhr.readyState==4)
        {
            if(xhr.status == 200)
            {   
                document.getElementById("tabla").innerText = "";
                let data = xhr.responseText;
                data = JSON.parse(data);
                   if(contttt == 0)
                   {
                    GuardarBaseLocalStorage(JSON.stringify(data.data));
                    $contttt = contttt+1;
                   }
                   Listar2();
            }
            else
            {
                    console.log(`Error:${xhr.status}-${xhr.statusText}`);
            }
        }
        else
        {
            document.getElementById("tabla").innerText = "";
            document.getElementById("tabla").appendChild(Spinner());
            
            
        }
    }
    xhr.open('GET','/traer',true);
     xhr.send();
}
export function Listar2()
{   
    document.getElementById("tabla").innerText = "";
    document.getElementById("tabla").appendChild(Spinner());
    
    setTimeout(function()
    {
    document.getElementById("tabla").innerText = "";
     let dates = localStorage.getItem("datos");
     let dati = JSON.parse(dates);
     

    // document.getElementById('tabla').appendChild(crearTabla(dati));
       document.getElementById("tabla").innerText = "";
       
       if(dati != "[]" || datil != null )
       {
            HabiSelec();
           
        
        document.getElementById('tabla').appendChild(crearTabla(dati));
        let td = document.getElementsByTagName('td');    
        HabilitarCheckbox();
        let referencia = document.getElementById("seleccionado");
        manejarINICIO(dati);
        referencia.addEventListener("change",function()
        {
             HabilitarCheckbox();
             FiltrarTransaccion(dati,this.value);
        })
        for(let i=0;i<td.length;i++)
        {
         
            td[i].addEventListener('click',function(e){
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
            });
            manejadorCheckbox(dati,document.getElementById("seleccionado").value);
     }
     if(Primera() == false)
     {
        let tip = cik();

     if(tip != 7)
     {
         DesaSelec();
     }

     }
     primero();
       }
       
    }, 3000);
    
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

export function cik()
{
    let tep = 0;
    let dat = document.getElementsByTagName("input");
    
    for(let i = 0; i<dat.length;i++)
    {
        if(dat[i].type == "checkbox")
        {
                    if(dat[i].type == "checkbox")
                    {
                        if (!dat[i].checked) 
                        {
                            tep++;
                        }
                    }
        }
    }
    return tep;

}