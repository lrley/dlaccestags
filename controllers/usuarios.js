const {response,request} = require('express');
const bcryptjs = require('bcryptjs');
const {validationResult}= require('express-validator')
const Usuario = require('../models/usuarioDB');



const usuariosGet = (req=request, res=response) =>{
  
    const {q='', nombre='No name', apiky='', page=1, limit='10'} = req.query;
    console.log(q , nombre, apiky)
  

    res.json({
       nombre
    })
  }

const usuariosPost = async (req=request, res=response) =>{

   const errors= validationResult(req)
   if( !errors.isEmpty() ){
      return res.status(400).json(errors);
   }

   const {nombre, cedula ,correo, password, rol,fechacreacion}= req.body;
   const usuario = new Usuario({nombre, cedula, correo, password, rol, fechacreacion});
   console.log(usuario)

   //VERIFICAR SI EL CORREO EXISTE
   const existeEmail= await Usuario.findOne({correo});
   if(existeEmail){
      console.log('no se grabo la informacion ese correo ya esta registrado')
      return res.status(400).json({
         msg:'Ese correo ya esta registrado'
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