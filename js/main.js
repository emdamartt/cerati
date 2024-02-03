/***** AGREGANDO DOM *****/

// Funcion que genera un constructor con sus respectivos parametros
function Disco(nombre, precio, año, stock, portada) {
    this.nombre = nombre;
    this.precio = precio;
    this.año = año;
    this.stock = stock;
    this.portada = portada;
}

//ARRAY DE DISCOS, NOMBRE, FECHAS y AÑOS.

const Disco1 = new Disco(
    "Soda Estereo",
    47600,
    1984,
    3,
    "../assets/img/album1.jpg"
);
const Disco2 = new Disco(
    "Nada Personal",
    22000,
    1985,
    4,
    "../assets/img/album2.jpg"
);
const Disco3 = new Disco("Signos", 85220, 1986, 6, "../assets/img/album3.jpg");
const Disco4 = new Disco(
    "Ruido Blanco",
    55500,
    1987,
    8,
    "../assets/img/album4.jpg"
);
const Disco5 = new Disco(
    "Doble Vida",
    74000,
    1988,
    13,
    "../assets/img/album5.jpg"
);
const Disco6 = new Disco(
    "Languis",
    35600,
    1989,
    18,
    "../assets/img/album6.jpg"
);
const Disco7 = new Disco(
    "Cancion Animal",
    55320,
    1990,
    2,
    "../assets/img/album7.jpg"
);
const Disco8 = new Disco("Rex Mix", 62000, 1991, 4, "../assets/img/album8.jpg");
const Disco9 = new Disco("Dynamo", 85220, 1992, 5, "../assets/img/album9.jpg");
const Disco10 = new Disco(
    "Zona de Promesas",
    55400,
    1993,
    12,
    "../assets/img/album10.jpg"
);
const Disco11 = new Disco(
    "Sueño Stereo",
    74000,
    1995,
    20,
    "../assets/img/album11.jpg"
);
const Disco12 = new Disco(
    "Confort y Musica Para Volar",
    75500,
    1996,
    11,
    "../assets/img/album12.jpg"
);
const Disco13 = new Disco(
    "El ultimo Concierto lado A",
    72000,
    1997,
    12,
    "../assets/img/album13.jpg"
);
const Disco14 = new Disco(
    "El ultimo Concierto lado B",
    72000,
    1997,
    3,
    "../assets/img/album14.jpg"
);
const Disco15 = new Disco(
    "Me Veras Volver #1",
    85520,
    2008,
    33,
    "../assets/img/album15.jpg"
);
const Disco16 = new Disco(
    "Me Veras Volver #2",
    85520,
    2008,
    43,
    "../assets/img/album16.jpg"
);
const Disco17 = new Disco(
    "Sep7imo Dia",
    72000,
    2017,
    23,
    "../assets/img/album17.jpg"
);
const Disco18 = new Disco(
    "Soda Estereo Grandes Exitos",
    85000,
    2020,
    13,
    "../assets/img/album18.jpg"
);

//ARRAY DE DISCOS
const Discos = [
    Disco1,
    Disco2,
    Disco3,
    Disco4,
    Disco5,
    Disco6,
    Disco7,
    Disco8,
    Disco9,
    Disco10,
    Disco11,
    Disco12,
    Disco13,
    Disco14,
    Disco15,
    Disco16,
    Disco17,
    Disco18,
];

//CREACION DE VARIABLE CARRITO.

let Carrito = [];

function cargarCarritoDesdeLocalStorage(){
    const carritoGuardado = localStorage.getItem("Carrito");
    if(carritoGuardado){
        Carrito = JSON.parse(carritoGuardado); 
    }
}
cargarCarritoDesdeLocalStorage();
//VARIABLE PARA LLAMADO DE CLASES
const botonAccesoShop = document.querySelectorAll(".shop");

//RECORRIDO DEL ARRAY DISCOS Y EVENTO CLICK DE CADA BOTON DE COMPRA DE DISCO.
botonAccesoShop.forEach((boton, posicion) => {
    boton.addEventListener("click", () => {
        cargarAlCarrito(posicion);
    });
});

//FUNCION QUE ENVIA DATOS AL CARRITO.
function cargarAlCarrito(posicion) {
    const productosSeleccionados = Discos[posicion];
    const productoEnCarrito = Carrito.find(
        (p) => p.nombre === productosSeleccionados.nombre
    );
    if (productoEnCarrito) {
        if (productoEnCarrito.stock < productosSeleccionados.stock) {
            productoEnCarrito.stock++;
            Toastify({
                text: "Su producto ha sido agregado al carrito",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "left",
                stopOnFocus: false,
                style: {
                    background: "linear-gradient(to right, #000000, #FFF000)",
                },
            }).showToast();
        } else {
            Toastify({
                text: "No hay mas stock del producto seleccionado",
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "left",
                stopOnFocus: false,
                style: {
                    background: "linear-gradient(to right, #000000, #FFF000)",
                },
            }).showToast();
        }
    } else {
        const productoNuevo = {
            ...productosSeleccionados,
            stock: 1,
        };
        Carrito.push(productoNuevo);
        guardarEnStorage();
        Toastify({
            text: "Su producto ha sido agregado al carrito",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "left",
            stopOnFocus: false,
            style: {
                background: "linear-gradient(to right, #000000, #FFF000)",
            },
        }).showToast();
    }
}

const botonCarrito = document.querySelector("#carrito");
botonCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

//Mostrar elementos del carrito

function mostrarCarrito() {
    if(Carrito.length === 0){
        Swal.fire({
            title: "Carrito de compras vacio",
            text: "No se han seleccionado productos",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Ok"
        });
        return;
    }else{
        // Crear un contenedor para los productos del carrito
        const contenedorCarrito = document.createElement("div");
        // Iterar sobre los productos en el carrito y crear elementos HTML
        Carrito.forEach((producto, index) => {
            const productoDiv = document.createElement("div");
            productoDiv.className = "producto-carrito d-flex gap-3";
            productoDiv.innerHTML = `
                <div class="w-25 h-25">
                    <img class="img-fluid mb-2 object-fit-cover" src="${producto.portada}">
                </div>
                <div>
                    <p><strong> Album: ${producto.nombre}</strong></p>
                    <p>Precio: $${producto.precio}</p>     
                    <p>Stock: ${producto.stock}</p>       
                </div>
                <div>
                    <i class="eliminar-producto bi bi-trash-fill fs-4" data-index="${index}"></i>
                </div>
            `;
            contenedorCarrito.appendChild(productoDiv);
        });
    
        // Mostrar SweetAlert con los productos del carrito
        Swal.fire({
            title: "Carrito de Compras",
            html: contenedorCarrito.innerHTML,
            showCancelButton: true,
            confirmButtonText: "Finalizar la compra",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                finalizarCompra();
            }
        });
    }
    const eliminar = document.querySelectorAll(".eliminar-producto")
    eliminar.forEach((producto, index) => {
        producto.addEventListener("click", () => {
            eliminarProducto(index);
        });
    });
    function eliminarProducto(index) {
        console.log(index);
        Swal.fire({
            title: "Desea eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
                console.log(index);
                // Eliminar el producto del array productosEnCarrito
                Carrito.splice(index, 1);
                        // Volver a mostrar el carrito actualizado
                        Swal.fire({
                            title: "El producto ha sido eliminado",
                            icon: "success",
                            confirmButtonText: "Ok",
                        });
                    }
                    mostrarCarrito();
                    guardarEnStorage();
                });
    }
    //Finaliza la compra del producto
    function finalizarCompra() {
        Swal.fire({
            title: "Compra Finalizada",
            text: "¡Gracias por tu compra!",
            icon: "success",
            confirmButtonText: "OK",
        });
        // Limpiar el carrito o realizar otras acciones según sea necesario
        Carrito.length = 0;
        guardarEnStorage();
        
    }
}


//Funcion para guardar en localStorage
function guardarEnStorage(){

    // Guardar en localStorage
    localStorage.setItem("Carrito", JSON.stringify(Carrito));
}
