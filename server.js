const express = require('express');
const cors = require('cors');

class Server {
    

    constructor() {
        this.app = express();
        this.puerto = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.clientesPath= '/api/clientes'
        this.compraTagPath= '/api/compratags'

        //MIDDLEWARES
        this.middlewares();
        

        //RUTAS DE LA APLICACION
        this.routes();

    }

    middlewares(){
        //CORS
        this.app.use(cors());


        //Lectoura y parseo del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));

    }


    routes(){

        this.app.use(this.usuariosPath, require('../routes/ruta-usuarios'));
        this.app.use(this.clientesPath, require('../routes/ruta-clientes'));
        this.app.use(this.compraTagPath, require('../routes/ruta-compraTags'));

    }



    listen(){

        this.app.listen( this.puerto, ()=>{
            console.log(`Servidor Corriendo en el puerto ${'http://localhost'+':'+ this.puerto} `)
        })

    }


}


module.exports = Server;