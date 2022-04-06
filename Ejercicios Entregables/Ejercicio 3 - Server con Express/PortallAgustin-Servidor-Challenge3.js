const express = require("express") //requerimos express
const fs = require("fs") //requerimos el módulo fs
const Contenedor = require("../Ejercicio 2 - Archivos/PortallAgustin-ejercicio-archivos") //requerimos la clase Contenedor del ejercicio entregable anterior

//-------------------------------------------------------PRODUCTOS-------------------------------------------------------//

const P = new Contenedor("productosDBserver.json")
const prod1 = {
    name: "Mouse Gamer XSoul",
    value: 1439,
    link: "https://http2.mlstatic.com/D_NQ_NP_625874-MLA45107175471_032021-O.webp"
    } //producto 1
const prod2 = {
    name: "Teclado Gamer XSoul XK800 QWERTY",
    value: 4728,
    link: "https://http2.mlstatic.com/D_NQ_NP_810197-MLA42141410789_062020-O.webp"
    } //producto 2
const prod3 = {
    name: "Auriculares Gamer XSoul Hx100",
    value: 3199,
    link: "https://http2.mlstatic.com/D_NQ_NP_717690-MLA48279023189_112021-O.webp"
    } //producto 3

P.save(prod1) //guardamos prod1 (después el 2 y el 3)

async function Obtener(){
    try {
        const data = await fs.promises.readFile("./productosDBserver.json", "utf-8")
        const Prod = JSON.parse(data)
        console.log("Obtenido!")
        const getRandom = Prod[Math.floor(Math.random() * Prod.length)]
        return await getRandom
    } catch (error) {
        console.log(`Se produjo un error al mostrar todos los elementos: ${error}`)
    }
} //obtenemos los datos y seleccionamos un elemento aleatorio del array de los objetos ingresados

//-------------------------------------------------------GET ENDPOINTS-------------------------------------------------------//

const app = express()
app.get('/productos', async (req, res) => {
    try { //intentamos mandar la response
        const All = await P.getAll()
        res.send(All)
    } catch (error) { //si hay error lo logeamos
        console.log(error)
    }
}) //si el endpoint es "/productos" mandamos como respuesta el método getAll()

app.get('/productoRandom', async (req, res) => {
    const x = await Obtener()
    res.send(x)
}) //si el endpoint es "/productoRandom" mandamos como respuesta la función Obtener() que devuelve un elemento aleatorio

//-------------------------------------------------------SERVIDOR-------------------------------------------------------//

const port = 8080 //puerto
const server = app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${server.address().port}`)
}) //definimos el servidor
server.on("error", error => console.log(`Error en servidor ${error}`)) //logeamos el error si hubiera al iniciar el servidor