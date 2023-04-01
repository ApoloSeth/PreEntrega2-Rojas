const mensaje = "Bienvenidos a la panadería - LA MIGUERIA\nPanadería de productos orgánicos libre de gluten\n\nSelecciona una de las siguientes opciones\n1 - Empleado (ingreso de productos)\n2 - Usuario (Comprar productos)\n0 - Para salir del menú"
let menu1 = 0 
const productos = []

do {
    menu1 = Number(prompt(mensaje))
    if (menu1 === 1){
        const contraseniaEmpleados = 8524
        const mensaje2 = "Ingresa la contraseña para ingresar a nuestro sistema de manejo de inventarios\nIngresa el número de 4 digitos: "
        let constraseniaIngresada
        let intentos = 0
        do {
            constraseniaIngresada = Number(prompt(mensaje2))
            intentos += 1
        } while (constraseniaIngresada !== contraseniaEmpleados && intentos <3)
        if (constraseniaIngresada === contraseniaEmpleados){
            const mensaje3 = "Ingresa la opción\n\n1 - Ingresar productos o modificar inventarios\n2 - Eliminar unidades de un producto\n0 - Para salir"
            let opcionEmpleado
            do {
                opcionEmpleado = Number(prompt(mensaje3))
                if (opcionEmpleado === 1){
                    const listadoProductos = productos.map(producto => `id: ${producto.id} -> nombre producto: ${producto.nombre} -> inventario: ${producto.inventario}`)
                    const idProducto = Number(prompt("Listado actual de productos\n" + listadoProductos.join("\n") + "\n\nIngresa el id del producto que quieres modificar o crear: "))
                    const productoParaModificar = productos.find(producto => producto.id === idProducto)
                    if (productoParaModificar){
                        const cantidad = Number(prompt("Ingresa las unidades para agregar al inventario: "))
                        productoParaModificar.ingresarModificarInventario(cantidad)
                    } else{
                        let id
                        do {
                            id = Number(prompt("Producto Nuevo\nIngresa el id del producto: "))
                        } while (isNaN(id) && id < 0)
                        const nombre = prompt("Ingresa el nombre del producto").toUpperCase()
                        const precio = Number(prompt("Ingresa el precio del producto: "))
                        const inventario = Number(prompt("Ingresa el inventario del producto: "))

                        const nuevoProducto = new Productos(id, nombre, precio, inventario)
                        productos.push(nuevoProducto)
                    }
                } else if (opcionEmpleado === 2){
                    const unidades = Number(prompt("Este espacio esta destinado a productos defectuosos o que cumplieron su fecha de caducidad\nIngrese la cantidad a modificar"))
                    const listadoProductos = productos.map(producto => `id: ${producto.id} -> nombre producto: ${producto.nombre} -> inventario: ${producto.inventario}`)
                    const idProducto = Number(prompt("Listado actual de productos\n" + listadoProductos.join("\n") + "\n\nIngresa el id del producto que quieres modificar: "))
                    const productoParaModificar = productos.find(producto => producto.id === idProducto)
                    productoParaModificar.restarInventario(unidades)
                } else if (opcionEmpleado === 0){
                    alert("Has salido de la zona de empleados")
                } else {
                    alert("Ingresa una opcion correcta")
                }
            } while (opcionEmpleado !== 0);
            
        }
    } else if (menu1 === 2){
        const mensaje4 = "Le damos la bienvenida a nuestro sitio destinado a la compra de nuestros productos\nSelecciona los productos que quieres agregar a tu canasta"
        let opcionUsuario
        let carritoProductos = []
        do {
            const listaProductos = productos.map(producto => `${producto.id} - ${producto.nombre}`).join("\n")
            opcionUsuario = Number(prompt(mensaje4 + "\n"+ listaProductos + "\n0 - Para salir" + "\n-1 - Para ver el resumen de carrito de compras"))
            let productoBuscado = productos.find(producto => producto.id === opcionUsuario)
            if (productoBuscado){
                let posicionProducto = carritoProductos.findIndex(producto => producto.id === productoBuscado.id)
                if (posicionProducto != -1){
                    let cantidad = Number(prompt(`Ingrese la cantidad de ${productoBuscado.nombre} que desea llevar: `))
                    carritoProductos[posicionProducto].cantidad += cantidad
                    carritoProductos[posicionProducto].subtotal = carritoProductos[posicionProducto].precio * carritoProductos[posicionProducto].cantidad
                    productoBuscado.restarInventario(cantidad)
                } else {
                    let cantidad = Number(prompt(`Ingrese la cantidad de ${productoBuscado.nombre} que desea llevar: `))
                    carritoProductos.push({
                        id : productoBuscado.id, 
                        nombre : productoBuscado.nombre, 
                        precio : productoBuscado.precio, 
                        cantidad : cantidad,
                        subtotal : productoBuscado.precio * cantidad
                    })
                    console.log(carritoProductos)
                    productoBuscado.restarInventario(cantidad)
                }
            } else if (opcionUsuario === 0){
                alert("Has salido de la zona de usuarios")
            } else if (opcionUsuario === -1){
                const resumenCompra =  carritoProductos.map(producto => `${producto.nombre}:  Cantidad: ${producto.cantidad} Un  precio unit: $${producto.precio}  subototal: $${producto.subtotal}`)
                alert(resumenCompra.join("\n"))
            } else {
                alert("Ingresa una opción valida")
            }
        } while (opcionUsuario !== 0);
    } else if (menu1 === 0){
        alert("Gracia por visitarnos")
    } else {
        alert("Ingresa una opción correcta")
    }
} while (menu1 !== 0);

