const {response,request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarioDB');



const usuariosGet = (req=request, res=response) =>{
  
    const {q='', nombre='No name', apiky='', page=1, limit='10'} = req.query;
    console.log(q , nombre, apiky)
  

    res.json({
       nombre
    })
  }

const usuariosPost = async (req=request, res=response) =>{

   const {nombre, cedula ,correo, password, rol, fechacreacion}= req.body;
   const usuario = new Usuario({nombre, cedula, correo, password, rol, fechacreacion});
   console.log(usuario)

   //VERIFICAR SI LA CEDULA EXISTE
   const existeCedula= await Usuario.findOne({cedula});
   if(existeCedula){
      console.log(`No se grabo la informacion porque la cedula ${cedula} ya existe`);
      return res.status(400).json({
         msg: 'Esta Cedula ya existe',
         cedula
      });
   }

   //VERIFICAR SI EL CORREO EXISTE
   const existeEmail= await Usuario.findOne({correo});
   if(existeEmail){
      console.log(`No se grabo la informacion el correo ${correo} ya esta registrado`)
      return res.status(400).json({
         msg:'Ese correo ya esta registrado',
         correo
      });
   }


   // ENCRIPTAR LA CONTRASEÑA
   const salt= bcryptjs.genSaltSync();
   usuario.password= bcryptjs.hashSync(password, salt);
   usuario.fechacreacion= new Date();


   //GUARDAR EN BASE DE DATOS
   await usuario.save();

   res.json({
      msg: 'POST API USUARIOS controlador update....',
      usuario
   })
 }

const usuariosPut = (req=request, res= response) =>{
   const id= req.params.id;
   console.log(id)
    res.json({
        msg: `UPDATE USER ${id} DEL API USUARIOS controlador update..`,
        id
     })
 }


 const usuariosDelete = (req=request, res=response) =>{
   const id= req.params.id;
   console.log(id)
    res.json({
        msg: `DELETE USER ${id} DEL API USUARIOS controlador..`,
        id
     })
  }

  module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
  }