export default class anu {
    public id:string;
    public titulo:string;
    public transaccion:string;
    public descripcion:string;
    public precio:string;
    public puertas:string;
    public kms:string;
    public potencia:string;

    constructor(id:string,titulo:string,transaccion:string,descripcion:string,precio:string
        ,puertas:string,kms:string,potencia:string) {
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