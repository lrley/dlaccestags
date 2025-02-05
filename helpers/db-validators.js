const Rol = require('../models/rolDB');
const Usuario = require('../models/usuarioDB');
const Cliente = require('../models/clienteDB');
const Compratag = require('../models/compraTagsDB');

/**
 * @param {String} rol 
 * consulta si existe el rol para post o put de un cliente para ruta-clientes.js
 * consulta si existe el rol para post de un usuario para ruta-usuarios.js
 */
const esRolValido = async(rol='')=>{
    const existeRol= await Rol.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }

}

/**
 * @param {String} cedula 
 * recibe la cedula del usuario para verificar si esta registrada post ruta-usuarios.js
 */
 const existeCedulaUser= async(cedula='')=>{
    
     const cedulaExiste = await Usuario.findOne({cedula})
       if(cedulaExiste){
          console.log(`No se grabo la informacion porque la cedula ${cedula} ya existe`);
          throw new Error(`La Cedula ${cedula} ya esta registrada en la Base de datos de usuarios`);
     
       }
 }
 
 /**
  * @param {String} correo 
  * Recibe el correo del usuario para verificar si esta registrado post ruta-usuarios.js
  */
const existeEmailUser= async(correo='')=>{
   
    const existeEmail= await Usuario.findOne({correo});
    if(existeEmail){
       console.log(`No se grabo la informacion el correo ${correo} ya esta registrado`)
       throw new Error(`El correo ${correo} ya esta registrado en la Base de datos de usuarios`);
    }

}

/**
 * @param {String} cedula
 * consulta si la cedula del cliente existe en la base de datos  ruta-clientes.js
 */
const existeCedulaCliente= async(cedula='')=>{
    
    const existeCedula= await Cliente.findOne({cedula});
     if(existeCedula){
        console.log(`No se grabo la informacion porque la cedula ${cedula} ya existe`);
        throw new Error(`La cedula ${cedula} ya esta registrada en la Base de datos de clientes`);
     }

}
   

/**
 * @param {String} correo 
 *  Recibe el correo del cliente para verificar si esta registrado en la base de datos  ruta-clientes.js
 */
const existeCorreoCliente= async(correo='')=>{
      const existeEmail= await Cliente.findOne({correo});
      if(existeEmail){
         console.log(`No se grabo la informacion el correo ${correo} ya esta registrado`)
         throw new Error(`El Correo ${correo} ya esta registrado en la Base de datos de clientes`);
      }
}
 
/**
 * @param {String} id
 * Recibe el Id y verifica si este Id existe en la base de datos de Usuario put  ruta-usuarios.js
 */
const existeUsuarioPorId=async(id)=>{
    const existeUsuarioId= await Usuario.findById(id);
    console.log(existeUsuarioId)
    if(!existeUsuarioId){
       console.log(`El Id No Existe ${id}`)
       throw new Error(`El Id:  ${id} no Existe`);
    }
}

/**
 * @param {String} id 
 * Recibe el Id y verifica si este Id existe en la base de datos de CLientes para put en clientes ruta-clientes.js
 */
const existeClientePorId=async(id)=>{
    const existeClienteId= await Cliente.findById(id);
    if(!existeClienteId){
       console.log(`El Id No Existe ${id}`)
       throw new Error(`El Id:  ${id} no Existe`);
    }
}

/**
 * @param {String} numerotag 
 * consulta si existe un tags de ruta-compratags.js
 */
const existeTag= async(numerotag)=>{
    const existeTag= await Compratag.findOne({numerotag});
    if(existeTag){
    console.log(`No se grabo la informacion porque el Tag ${numerotag} ya existe`);
        throw new Error(`No se grabo la informacion porque el Tag: ${numerotag} ya Existe`);
    }
}

/**sin utilizar */
const NoexisteTag= async(numerotag)=>{
    const NoexisteTag= await Compratag.findOne({numerotag});
    
    console.log(numerotag)
    if(!NoexisteTag){
        throw new Error(`El Tag: ${numerotag} no existe en la base de datos`);
    }
}

/**
 * @param {String} rol
 * comprueba si existe el Id de roles para actualizarlo en la tabla Rol ruta-roles.js
 */
const NoexisteRolId=async(rol)=>{
    
    const existeRol= await Rol.findById(rol);
    if(!existeRol){
       console.log(`El Rol No Existe con id: ${rol}`)
       throw new Error(`El Rol con Id: ${rol} no Existe`);
    }
}

/** Sin Utilizar */
const existeRol=async(rol)=>{
   
    const existeRol= await Rol.findOne({rol});
    if(existeRol){
        console.log(`No se grabo el Rol porque ya existe`)
        throw new Error(`No se grabo el Rol porque ya existe`);
    }

}

/**
 * @param {String} id 
 * consulta Tags por ID de ruta-compratags.js
 */
const existeTagPorId=async(id)=>{
    const existeTagId= await Compratag.findById(id);
    if(!existeTagId){
       console.log(`El Id No Existe ${id}`)
       throw new Error(`El Id:  ${id} no Existe`);
    }
}

/**
 * modulos a exportar
 */
module.exports={
    esRolValido,
    existeCedulaUser,
    existeEmailUser,
    existeCedulaCliente,
    existeCorreoCliente,
    existeUsuarioPorId,
    existeClientePorId,
    existeTag,
    NoexisteTag,
    existeRol,
    NoexisteRolId,
    existeTagPorId,
}