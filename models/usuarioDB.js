
const {Schema, model} = require('mongoose');

const SchemaUsuario = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es Obligatorio']
    },

    cedula:{
        type:String,
        required: [true, 'La Cedula es Requerida'],
        unique: true
    },

    correo:{
        type: String,
        required: [true, 'El Correo es Obligatorio'],
        unique: true
    },

    password:{
        type: String,
        required: [true, 'La contraseña es Obligatorio']
    },


    rol:{
        type: String,
        required: true,
        //enum:['ADMIN_ROLE', 'USER_ROLE']
    },

    estado:{
        type: Boolean,
        default: true
    },

    google:{
        type: Boolean,
        default: false
    },

    fechacreacion:{
        type: Date,
        required: true,
        
    }



});

module.exports= model('Usuario',SchemaUsuario);
