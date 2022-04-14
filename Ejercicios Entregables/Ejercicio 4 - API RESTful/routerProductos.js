const { Router } = require("express")
const ProductosClass = require("../Ejercicio 4 - API RESTful/productosClass") //requerimos la clase productos (nos sirve para guardar los productos)
const fs = require("fs") //requerimos fs
const express = require("express")

const routerProductos = new Router()

routerProductos.get("/", (req, res) => {
    const Productos = new ProductosClass("productos.json") //instanciamos la clase
    const Prod1 = {
        "name": "Mouse Gamer XSoul",
        "value": 1439,
        "link": "https://http2.mlstatic.com/D_NQ_NP_625874-MLA45107175471_032021-O.webp"
      } //producto 1
    const Prod2 = {
        "name": "Teclado Gamer XSoul XK800 QWERTY",
        "value": 4728,
        "link": "https://http2.mlstatic.com/D_NQ_NP_810197-MLA42141410789_062020-O.webp"
      } //producto 2
    const Prod3 = {
        "name": "Auriculares Gamer XSoul Hx100",
        "value": 3199,
        "link": "https://http2.mlstatic.com/D_NQ_NP_717690-MLA48279023189_112021-O.webp"
      } //producto 3
    try { //tratamos de guardar los productos
        Productos.save(Prod1).then(async () => await Productos.save(Prod2)).then(async () => await Productos.save(Prod3))  
        res.json({ mensaje: "Se guardaron los productos exitosamente!"})
    } catch (error) { //catcheamos el error y lo envíamos como response al "localhost:8080/" y en la consola
        res.json({ mensaje: `Se ha producido un error! \n${error}`}) && console.log(error)
    }
}) //hacemos un get con la ruta "/" para que guarde los productos

routerProductos.get("/all", async (req, res) => {
    const data = await fs.promises.readFile("./productos.json", "utf-8") //leemos el archivo
    console.log("Productos obtenidos!")
    res.json(JSON.parse(data)) //envíamos como response el producto completo
}) //en la ruta "/api/productos" hacemos que se muestren todos los productos 

routerProductos.get("/:id", async (req, res) => {
    const data = await fs.promises.readFile("./productos.json", "utf-8") //leemos el archivo
    const parsedData = JSON.parse(data) //convertimos a objeto
    const index = await parsedData.findIndex((P) => { //creamos un índice
        if(P.id === req.params.id) return true //si los productos tienen de valor "req.params.id" en la propiedad id devuelve true con la posición en la que se encuentra
        else return false && console.log("error")
    })
    console.log(index)
    console.log(parsedData.length)
    res.json(parsedData[index]) //mostramos el objeto con esa id
})

routerProductos.post("/add", async (req, res) => {
    const data = await fs.promises.readFile("./productos.json", "utf-8")
    const parsedData = JSON.parse(data)
    const idNP = parsedData.length + 1
    const NuevoProducto = 
    {
        "id": idNP,
        "name": "Aire acondicionado BGH",
        "value": 84.999,
        "link": "https://http2.mlstatic.com/D_NQ_NP_694117-MLA40282485103_122019-O.webp"
    }
    parsedData.push(NuevoProducto)

    let aJson = JSON.stringify(productos); //convertimos a JSON
    await fs.promises.writeFile("./productos.json", aJson, null, "\t") //reemplazar valores en el JSON
    console.log("El contenido se guardó correctamente.")
    res.json(
/*     <form action="/api/productos" method="post">
    <ul>
     <li>
       <label for="name">Nombre:</label>
       <input type="text" id="name" name="user_name" />
     </li>
     <li>
       <label for="mail">Correo electrónico:</label>
       <input type="email" id="mail" name="user_email" />
     </li>
     <li>
       <label for="msg">Mensaje:</label>
       <textarea id="msg" name="user_message"></textarea>
     </li>
     </ul>
     </form> */
     )
})

module.exports = routerProductos