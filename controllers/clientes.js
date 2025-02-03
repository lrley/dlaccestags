const {response,request} = require('express');
const bcryptjs = require('bcryptjs');
const Cliente = require('../models/clienteDB');
const { fechaEcuador } = require('../middlewares/fechaActual');


const clientesGet = (req=request, res=response) =>{
   
    res.json({
       msg: 'GET API CLIENTE controlador update..',

    })
  }


const clientePost =  async(req=request, res=response) =>{
   const {nombre,cedula,direccion,correo,password,rol,idUsuario,usuario}= req.body;

   
   const cliente= new Cliente({nombre,cedula,direccion,correo,password,rol,fechacreacion:fechaEcuador(),idUsuario,usuario});
    
     //VERIFICAR SI LA CEDULA EXISTE
      const existeCedula= await Cliente.findOne({cedula});
      if(existeCedula){
         console.log(`No se grabo la informacion porque la cedula ${cedula} ya existe`);
         return res.status(400).json({
            msg: 'Esta Cedula ya existe',
            cedula
         });
      }
   
      //VERIFICAR SI EL CORREO EXISTE
      const existeEmail= await Cliente.findOne({correo});
      if(existeEmail){
         console.log(`No se grabo la informacion el correo ${correo} ya esta registrado`)
         return res.status(400).json({
            msg:'Ese correo ya esta registrado',
            correo
         });
      }
   
   
      // ENCRIPTAR LA CONTRASEÑA
      const salt= bcryptjs.genSaltSync();
      cliente.password= bcryptjs.hashSync(password, salt);
   
   
   
   
    



    //GUARDAR EN BASE DE DATOS
    await cliente.save();

    res.json({
      msg: 'POST API CLIENTE controlador update',
      cliente,
   })
 }


 const clientePut= (req=request, res=response) =>{
   const id= req.params.id;
   console.log(id)
    res.json({
        msg: `UPDATE CLIENTE ${id} DEL API CLIENTES controlador update..`,
        id
     })
 }


 const clienteDelete = (req=request, res=response) =>{
   const id= req.params.id;
   console.log(id)
   res.json({
       msg: `DELETE CLIENTE ${id} DEL API CLIENTES controlador update..`,
       id
    })
  }

  module.exports = {
    clientesGet,
    clientePost,
    clientePut,
    clienteDelete,

  }