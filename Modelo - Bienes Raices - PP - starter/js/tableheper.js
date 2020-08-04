export function crearTabla(array) {
    let tabi = [];
    if(array != null)
    {
        var tabla;
        tabla = document.createElement('table');
        tabla.setAttribute('border','5px solid');
        tabla.setAttribute('style','border-collapse: collapse');
    
        let cabecera = document.createElement('tr');
        cabecera.setAttribute("class","rojo");
        for(let atriubuto in array[0]){
            
            let th= document.createElement('th');
            th.textContent = atriubuto;
          
            
                cabecera.appendChild(th);
        }
        tabla.appendChild(cabecera);
        for(let i = 0 ;i <array.length;i++){
            let fila = document.createElement("tr");
            let unObjeto=array[i];
            for(let j in unObjeto){
               
    
                var celda= document.createElement('td');
                celda.setAttribute('style','text-align:center');
                celda.textContent= unObjeto[j];
                fila.appendChild(celda);
            }
            tabla.appendChild(fila);
        }
        
        
    }
    tabi = tabla;
    return tabi;
}
