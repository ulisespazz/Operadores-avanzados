class productos {
    constructor(id,nombre,producto,precio){
        this.id = id
        this.nombre = nombre
        this.producto = producto
        this.precio = precio
    }
}

const producto1 = new productos(1,"Agua", "Bebida", 60)
const producto2 = new productos(2,"CocaCola", "Bebida", 130)
const producto3 = new productos(3,"Pepsi", "Bebida", 130)
const producto4 = new productos(4,"7up", "Bebida", 120)
const producto5 = new productos(5,"Mirinda", "Bebida", 110)
const producto6 = new productos(6,"Speed", "Bebida", 150) 
const producto7 = new productos(7,"Gomitas", "Golosina", 60)
const producto8 = new productos(8,"Caramelos", "Golosina", 60)
const producto9 = new productos(9,"Alfajor", "Golosina", 100)
const producto10 = new productos(10,"Chupetin", "Golosina", 40)
const producto11 = new productos(11,"Chicle", "Golosina", 60) 
const producto12 = new productos(12,"PapasLays", "Snacks", 100)
const producto13 = new productos(13,"Doritos", "Snacks", 120)
const producto14 = new productos(14,"3D", "Snacks", 100)
const producto15 = new productos(15,"Cheetos", "Snacks", 110)
const producto16 = new productos(16,"Pringles", "Snacks", 400)

let productosArray = [producto1, producto2, producto3, producto4, producto5, 
    producto6, producto7, producto8, producto9, producto10, producto11, 
    producto12, producto13, producto14, producto15, producto16]

let divProductos = document.getElementById('divProductos')
let contenedorTabla = document.getElementById('tablaCarrito')
const totalCarrito = document.getElementById("totalCarrito")

function mostrarProductos(productosArray){
    productosArray.forEach(producto =>{
        divProductos.innerHTML += `
            <div class="card divProductos" id="Producto${producto.id}" style="width: 18rem;">
                <img src="/img/producto${producto.id}.jpg" class="card-img-top" alt="...">
                <div class="card-body" >
                    <p>Nombre: ${producto.nombre}</p>
                    <p>Tipo de producto: ${producto.producto}</p>
                    <p>Precio: ${producto.precio}</p>
                    <div class="botones">
                        <button id="boton${producto.id}" onclick="agregar(${producto.id})" class="btn btn-primary btn1">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `
    })
    //<button id="boton${producto.id}" class="btn btn-primary btn1">Comprar ahora</button>
}

function mostrarCarrito(){
    let carrito = capturarStorange()
    contenedorTabla.innerHTML = ""
    carrito.forEach(element =>{
        contenedorTabla.innerHTML += `
        <tr>
            <td data-th="Product">
                <div class="row">
                    <div class="col-sm-2 hidden-xs"><img src="/img/producto${element.id}.jpg" width=64px alt="..."/></div>
                        <div class="col-sm-10">
                            <h4 class="nomargin">${element.producto} ${element.nombre}</h4>
                        </div>
                    </div>
                </div>
            </td>
            <td data-th="Precio">${element.precio}</td>
            <td data-th="Cantidad">
                <button onclick="restarCantidad(${element.id})" class="btn"> - </button>
                ${element.cantidad}
                <button onclick="incrementarCantidad(${element.id})" class="btn"> + </button>
            </td>
            <td data-th="Subtotal" class="text-center">${element.precio * element.cantidad}</td>
            <td><button onclick="eliminarProductoCarrito(${element.id})" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i>x</button></td>
        </tr>
        `
    })
    
}



function capturarStorange(){
    return JSON.parse(localStorage.getItem("carrito")) || []
}

function guardarStorange(array){
    localStorage.setItem("carrito", JSON.stringify(array))
}

//funcion para agregar al carrito, si esta suma cantidad.
function agregar(idd){
    let carrito = capturarStorange()
    if (estaEnCarrito(idd)){
        incrementarCantidadProductos(idd)
    }else{
        let productoEcontrado = productosArray.find(e=>e.id==idd)
        carrito.push({...productoEcontrado, cantidad:1})
        guardarStorange(carrito)
        mostrarCarrito()
    }
    mostrarCarrito()
    console.log(carrito)
    mostrarTotalCarrito()
}

function incrementarCantidadProductos(id){
    let carrito = capturarStorange()
    const indice = carrito.findIndex(e=>e.id==id)
    carrito[indice].cantidad++
    guardarStorange(carrito)
    mostrarCarrito(carrito)
}

function estaEnCarrito(id){
    let carrito = capturarStorange()
    return carrito.some(e=>e.id==id)
}

function eliminarProductoCarrito(id) {
    let carrito = capturarStorange()
    let resultado = carrito.filter(celular => celular.id != id)
    guardarStorange(resultado)
    console.log(resultado)
    mostrarCarrito()
    mostrarTotalCarrito()
}

function mostrarTotalCarrito() {
    const carrito = capturarStorange();
    const total = carrito.reduce(
      (acc, element) => acc + element.cantidad * element.precio,0
    );
    totalCarrito.innerHTML = total;
}

function incrementarCantidad(id) {
    const carrito = capturarStorange();
    const indice = carrito.findIndex((e) => e.id === id); // busco la posicion del producto
    carrito[indice].cantidad++    
    guardarStorange(carrito)
    mostrarCarrito()
}

function restarCantidad(id) {
    let carrito = capturarStorange();
    const indice = carrito.findIndex((e) => e.id === id);
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--
        guardarStorange(carrito)
        mostrarCarrito()
    } else {
      carrito = confirm(`desea eliminar ${carrito[indice].nombre} del carrito de compras`) && eliminarProductoCarrito(id);
    }
}

mostrarProductos(productosArray)
mostrarCarrito()
mostrarTotalCarrito()