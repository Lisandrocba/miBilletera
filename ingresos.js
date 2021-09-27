class Ingresos extends Datos{
    static contadorIngresos = 0;
    constructor(descripcion, valor){
        super(descripcion, valor);
        this._idIngresos = ++Ingresos.contadorIngresos;
    }

    get idIngresos(){return this._idIngresos}
}