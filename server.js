const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

class Contenedor {
    constructor (file){
        this.file = file;
    }

    //Get all the objects
    async getAll(){
        try {
            const data = await fs.promises.readFile(this.file);
            const object = JSON.parse(data);
            //console.log(object);
            return object;
        } catch (err) {
            throw new Error(err);
        }
    }

    //Get one random object
    async getOne(){
        try {
            const data = await fs.promises.readFile(this.file);
            const object = JSON.parse(data);
            const random = Math.floor(Math.random() * object.length);
            return object[random];
        } catch (err) {
            throw new Error(err);
        }
    }
}

let contenedor = new Contenedor('./productos.txt');


const server = app.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${port}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))
app.get('/', (req, res) => {
    res.send('<h1 style="color:green;">Bienvenidos al servidor express</h1><h2>Puedes ver todos los productos <a href="/productos">aquí</a></h2><h2>Puedes ver un producto random <a href="/productoRandom">aquí</a></h2>')
})
app.get('/productos', (req, res) => {
    contenedor.getAll().then(data => {
        res.send(`<h1 style="color:green;">Todos los productos</h1><div>${JSON.stringify(data)}</div><h2 style="color:green">Aca van mas bonitos</h2><div style="display:flex; flex-direction: column; justify-content:center; align-items: center"><img src= "${data[0].thumbnail}"><p>Producto: ${data[0].title}</p><p>Precio: $${data[0].price}</p></div><div style="display:flex; flex-direction: column; justify-content:center; align-items: center"><img src= "${data[1].thumbnail}"><p>Producto: ${data[1].title}</p><p>Precio: $${data[1].price}</p></div><div style="display:flex; flex-direction: column; justify-content:center; align-items: center"><img src= "${data[2].thumbnail}"><p>Producto: ${data[2].title}</p><p>Precio: $${data[2].price}</p></div>`);
    }).catch(err => {
        res.send(err);
    })
    
})
app.get('/productoRandom', (req, res) => {
    contenedor.getOne().then(data => {
        res.send(`<h1 style="color:green;">Aquí hay un producto random</h1><div style="display:flex; flex-direction: column; justify-content:center; align-items: center"><img src= "${data.thumbnail}"><p>Producto: ${data.title}</p><p>Precio: $${data.price}</p></div><h2>Si lo que se tenía que mostrar era el objeto, lo dejo aca: </h2><div>${JSON.stringify(data)}</div>`);
    }).catch(err => {
        res.send(err);
    })
})