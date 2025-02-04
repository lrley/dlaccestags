const {Schema,model}= require('mongoose');


const SchemaCliente=Schema({

nombre:{
    type: String,
    required: [true, 'El nombre es obligatorio']
},

cedula:{
    type:String,
    required: [true, 'La Cedula es Requerida'],
    unique: true
},

direccion:{
    type: String,
    required: [true, 'La Direccion es Requerido'],
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
    //enum:['CLIENTE_ADMIN_ROL','CLIENTE_USER_ROL']
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
   
    
},

idUsuario:{
    type: String, 
    required: [true, 'El id de Usuario es Requerido'],
},

usuario:{
    type: String,
    required: [true, 'El nombre de Usuario es Requerido'],

},

fechaActualizacion:{
        type: Date,
        required: true,
    }

});


SchemaCliente.methods.toJSON= function(){

    const {_id, __v,password, ...client}= this.toObject();
    return client;
}

module.exports= model('Cliente',SchemaCliente);