export default class DataAcess {
    constructor(id, titulo, transaccion, descripcion, precio, puertas, kms, potencia) {
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
var enumTransacciones;
(function (enumTransacciones) {
    enumTransacciones["Todos"] = "Todos";
    enumTransacciones["Alquiler"] = "Alquiler";
    enumTransacciones["Ventas"] = "Venta";
    enumTransacciones["Permutar"] = "Permutar";
})(enumTransacciones || (enumTransacciones = {}));
export function CargarSelector() {
    let sltransaccion = document.getElementById("seleccionado");
    for (let item in enumTransacciones) {
        let option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        sltransaccion.appendChild(option);
    }
}
//# sourceMappingURL=datos.js.map