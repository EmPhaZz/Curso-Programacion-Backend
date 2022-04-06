const fs = require("fs")
let Idn = 0

const baseProd = JSON.parse(fs.readFileSync('./productosDB.json'))

class Contenedor {
    constructor(ruta, nA){
        this.ruta = ruta,
        this.nombreArchivo = nA,
        this.caja = []
    }

    async Crear() { //creamos el archivo con algunos productos pre-cargados
       
            /*const data = await fs.promises.readFile(this.nombreArchivo, "utf-8") //leemos el archivo y mostramos por consola su contenido
            console.log(`Archivo: ${data}`)*/

        
    }

    async save(addID, addName, addValue, addLink){ //añadimos parámetros que reprensenten las propiedades del objeto a ingresar
        fs.promises.writeFile(this.nombreArchivo, "utf-8")
        try { //console logeamos para tener otra constancia que se creó
            console.log(`El archivo ${this.nombreArchivo} se creó y guardó exitósamente.`)
        } catch (error) { //si hay error lo mostramos
            console.log(`Se produjo un error al crear el archivo.\n Error: ${error}`)
        }
        const Obj = 
        `{
        "id": ${addID},
        "name": "${addName}",
        "value": ${addValue},
        "link": "${addLink}"
        }` //almacenamos en una variable el objeto para poder cerificar su contenido en pasos siguientes
        const EleA =  await fs.promises.readFile(this.nombreArchivo, "utf-8", (err) => {
            if(err) console.log(`Error al pasar datos a Contenedor.caja!\n ${err}`)
        })
        const P = JSON.parse(EleA)
        this.caja = P
        console.log(this.caja)
        await fs.promises.appendFile(this.nombreArchivo, `\n${Obj}]`, () => { //actualizamos el archivo con el objeto ingresado
            try {
                if(addID) { //si se le dio una ID pero el valor ingresado no es correcto por el orden de productos le asigna el que corresponda por la posición
                    for(let c of this.caja){
                        this.caja.push(c.id)
                    }
                    Obj.id = EleA.length + 1
                    console.log(`La ID del producto ingresado no se corresponde con la siguiente en cola. Se ha asignado el valor siguiente: ${Idn} a la propiedad ${Obj.id} del producto ${Obj.name}`)
                }
            } catch (error) {
                console.log(`Se produjo un error sobreescribir el archivo.\n Error: ${error}`)
            }
            console.log("El contenido se guardó correctamente.")
        })
        }
        
    getById(nId){ //se obtiene una ID
        try {
            if(nId) { //si existe muestra el objeto que la contiene
                const prodFull = this.caja.filter(() => this.caja.id === nId)
                console.log(`${prodFull}`) 
            }
        } catch (error) { //si hay un error lo logea por consola
            console.log(`Se produjo un error al obtener la ID ingresada.\nError: ${error}`)
        }
    }
    getAll(){ //muestra todos los objetos
        try { 
            console.log(`${this.caja}`) 
        } catch (error) { //si hay un error lo logea por consola
            console.log(`Se produjo un error al mostrar los datos.\nError: ${error}`)
        }
    }
    async deleteById(s){ //elimina el objeto con la ID provista
        const datos = fs.readFile(this.nombreArchivo, "utf-8")
        const prodParse = JSON.parse(datos)

        if(s === NaN) return console.log("La ID debe ser un número")
        if(s === Number){
            function Delete() {
                try {
                    const a = datos.findIndex((producto) => producto.id === s)
                    fs.promises.unlink(this.nombreArchivo)
                } catch (error) {
                    console.log(`Se produjo un error al eliminar el producto.\n Error: ${error}`)
                }
                }
                Delete()
        }
    }

    deleteAll(){ //elimina todo el archivo
        try {
            fs.promises.unlink("productosDB.json")
        } catch (error) {
            console.log(`Se produjo un error al eliminar el lote completo.\n Error: ${error}`)
        }
    }
}

const R = new Contenedor("./Ejercicios-Entregables", "productosDB.json") 
R.Crear()
R.save(1,"Taladro Percutor Bauker", 24.500, "https://http2.mlstatic.com/D_NQ_NP_793826-MLA48677498217_122021-O.webp")
R.save(2, "Alfajor Jorgito", 70, "https://http2.mlstatic.com/D_NQ_NP_863355-MLA42701146234_072020-O.webp")
R.save(3, "Televisor Sansei", 50.000, "https://http2.mlstatic.com/D_NQ_NP_922576-MLA47150753339_082021-O.webp")
R.save(4, "Cuadro Artesanal", 500, "https://http2.mlstatic.com/D_NQ_NP_732729-MLA46158108117_052021-O.webp")

getById(3)
getAll()
// deleteById(2)
// deleteAll()