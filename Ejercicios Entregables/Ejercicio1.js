class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return console.log(`El nombre completo del usuario es ${this.nombre} ${this.apellido}`)
    }

    addMascota(nMascota){
        this.mascotas.push(nMascota)
        console.log(`La mascota "${nMascota}" fue añadida correctamente`)
    }

    countMascotas(){
        console.log("Las mascotas ingresadas quedan conformadas de la siguiente manera:")
        for(const a of this.mascotas){
        console.log(`• ${a}`)
        }
        console.log("----------")
        console.log(`La cantidad de mascotas que tiene ${this.nombre} son ${this.mascotas.length}`)
    }

    addBook(nombre, autor){
        nombre = `${nombre}`
        autor = `${autor}`
        this.libros.push({nombre, autor})
    }

    getBookNames(){
        console.log("Los nombres de los libros son los siguientes:")
        for(let e of this.libros){
            console.log(`• ${e.nombre}`)
        }
    }
}
let usuario1 = new Usuario("Agustín", "Portall Pilosi", [{nombre: "La Ilíada", autor: "Homero"}], ["Perro", "Gato", "Cobayo"])

console.log("---------------------------")
usuario1.getFullName()
console.log("---------------------------")
usuario1.addMascota("Pez Dorado")
console.log("---------------------------")
usuario1.countMascotas()
console.log("---------------------------")
usuario1.addBook("La Odisea", "Homero")
usuario1.getBookNames()