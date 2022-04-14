const fs = require("fs")

class ProductosClass {
    constructor(NombreArchivo){
        this.nombreArchivo = NombreArchivo
    }

    async save(Prod){ //añadimos el objeto a ingresar
        const data = await fs.promises.readFile(this.nombreArchivo, "utf-8")
        const productos = JSON.parse(data)
        let Id = 1
        if(Prod.id) Id = Prod.id //producto tiene id (?)
            else if (productos.length === 0) Id //asigna 1 si productosDB.json esta vacío o el último objeto no tiene una id
        else Id = productos[productos.length - 1].id + 1 //sino, asignar el id del ultimo producto + 1.
        console.log(`La id del producto que se ingresó: ${Id}`) //mostrar la id de cada objeto por consola

        const PNuevo = { //nuevo producto
            id: Id,
            name: Prod.name,
            value: Prod.value,
            link: Prod.link
          };
          await productos.push(PNuevo)
      
        let aJson = JSON.stringify(productos); //convertimos a JSON
        await fs.promises.writeFile(this.nombreArchivo, aJson, null, "\t") //reemplazar valores en el JSON
        console.log("El contenido se guardó correctamente.")
        }

}
module.exports = ProductosClass