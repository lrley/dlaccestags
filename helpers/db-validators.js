const Rol = require('../models/rolDB');
const Usuario = require('../models/usuarioDB');
const Cliente = require('../models/clienteDB');

const esRolValido = async(rol='')=>{
    const existeRol= await Rol.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }

}

/**
 * 
 * @param {String} cedula 
 * recibe la cedula del usuario para verificar si esta registrada
 */
 const existeCedulaUser= async(cedula='')=>{
     console.log(cedula)
     const cedulaExiste = await Usuario.findOne({cedula})
       if(cedulaExiste){
          console.log(`No se grabo la informacion porque la cedula ${cedula} ya existe`);
          throw new Error(`La Cedula ${cedula} ya esta registrada en la Base de datos de usuarios`);
       }
 }
 
 /**
  * 
  * @param {String} correo 
  * Recibe el correo del usuario para verificar si esta registrado
  */
const existeEmailUser= async(correo='')=>{
    console.log(correo)
    const existeEmail= await Usuario.findOne({correo});
    if(existeEmail){
       console.log(`No se grabo la informacion el correo ${correo} ya esta registrado`)
       throw new Error(`El correo ${correo} ya esta registrado en la Base de datos de usuarios`);
    }

}

/**
 * 
 * @param {String} cedula
 * Recibe la cedula del cliente para verificar si esta registrada en la base de datos 
 */
const existeCedulaCliente= async(cedula='')=>{
    
    const existeCedula= await Cliente.findOne({cedula});
     if(existeCedula){
        console.log(`No se grabo la informacion porque la cedula ${cedula} ya existe`);
        throw new Error(`La cedula ${cedula} ya esta registrada en la Base de datos de clientes`);
     }

}
   

/**
 * 
 * @param {String} correo 
 *  Recibe el correo del cliente para verificar si esta registrado en la base de datos
 */
const existeCorreoCliente= async(correo='')=>{
      const existeEmail= await Cliente.findOne({correo});
      if(existeEmail){
         console.log(`No se grabo la informacion el correo ${correo} ya esta registrado`)
         throw new Error(`El Correo ${correo} ya esta registrado en la Base de datos de clientes`);
      }

}
 


module.exports={
    esRolValido,
    existeCedulaUser,
    existeEmailUser,
    existeCedulaCliente,
    existeCorreoCliente,
}