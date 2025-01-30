
const {Schema, model}= require('mongoose')


const SchemaRol = Schema({

    rol:{
        type: String,
        required: [true, 'El Rol es Obligatorio'],
        unique: true
    },

});


module.exports = model('Rol', SchemaRol)