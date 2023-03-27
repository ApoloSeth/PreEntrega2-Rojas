class Productos {
    constructor(id, nombre, precio, inventario, agotado = false, categoria){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.inventario = inventario
        this.agotado = agotado
    }
    ingresarModificarInventario(unidades){
        if (!isNaN(unidades) && unidades > 0){
            this.inventario += unidades
        } else {
            alert("Ingresa un número valido de unidades")
        }
    }
    restarInventario(unidades){
        if (unidades < this.inventario){
            this.inventario -= unidades
        } else {
            alert(`No hay ${unidades} disponibles del producto ${this.nombre}\nActualmente contamos con ${this.inventario} unidades`)
        }
    }
    estaAgotado(){
        if (this.inventario === 0){
            this.agotado = true
            alert("Producto agotado")
        }
    }
}