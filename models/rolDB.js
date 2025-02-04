
const {Schema, model} = require('mongoose');


const SchemaRol = Schema({

    rol:{
        type: String,
        required: [true, 'El Rol es Obligatorio'],
        unique: true
    },

});


SchemaRol.methods.toJSON= function(){

    const { __v, ...roles}= this.toObject();
    return roles;
}

module.exports= model('Rol',SchemaRol);