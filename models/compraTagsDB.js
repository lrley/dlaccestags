
const {Schema, model} = require('mongoose');

const SchemaCompraTags = Schema({

    
    idcliente:{
        type: String,
        required: [true, 'El Id del Cliente es Obligatorio']
    },

    cliente:{
        type: String,
        required: [true, 'El nombre del cliente es Obligatorio']
    },

    factura:{
        type:String,
        required: [true, 'El numero de la Factura es Requerida'],
       
    },

    numerotag:{
        type: String,
        required: [true, 'El numero del Tag es Requerida'],
        unique: true
    },

    taghexadecimal:{
        type: String,
        required: [true, 'El numero del Tag en Hexadecimal es Requerida'],
      
    },

    fechacreacion:{
        type: Date,
        required: true,
       
        
    },

    idusuario:{
        type: String, 
        required: [true, 'El id de Usuario es Requerido'],
    },
    
    usuario:{
        type: String,
        required: [true, 'El nombre de Usuario es Requerido'],
    
    },



});

SchemaCompraTags.methods.toJSON= function(){

    const {_id, __v, ...client}= this.toObject();
    return client;
}


module.exports= model('Compratag',SchemaCompraTags);