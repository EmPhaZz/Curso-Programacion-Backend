const express = require("express") //requerimos express
const routerProductos = require("./routerProductos") //requerimos el router

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/productos", routerProductos)

const port = 8080 //puerto

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
}) //definimos el servidor
server.on("error", error => console.log(`Error en servidor ${error}`)) //logeamos el error si hubiera al iniciar el servidor