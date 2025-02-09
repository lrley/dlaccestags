const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    

    constructor() {
        
        this.app = express();
        this.puerto = process.env.PORT || 3000;

        this.usuariosPath = '/api/usuarios';
        this.authPath='/api/auth'
        this.clientesPath= '/api/clientes'
        this.compraTagPath= '/api/compratags'
        this.rolesPath='/api/roles'

        //CONECTAR A BASE DE DATOS
        this.conectarDB();

        //MIDDLEWARES
        this.middlewares();
        

        //RUTAS DE LA APLICACION
        this.routes();

    }

    async conectarDB(){
        await dbConnection();

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

        this.app.use(this.authPath, require('../routes/ruta-auth'));
        this.app.use(this.usuariosPath, require('../routes/ruta-usuarios'));
        this.app.use(this.clientesPath, require('../routes/ruta-clientes'));
        this.app.use(this.compraTagPath, require('../routes/ruta-compraTags'));
        this.app.use(this.rolesPath, require('../routes/ruta-roles'));

    }



    listen(){

        this.app.listen( this.puerto, ()=>{
            console.log(`Servidor Corriendo en el puerto ${'http://localhost'+':'+ this.puerto} `)
        })

    }


}


module.exports = Server;