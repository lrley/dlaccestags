const {response,request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarioDB');
const { fechaEcuador } = require('../helpers/fechaActual');


const usuariosGet = (req=request, res=response) =>{
  
    const {q='', nombre='No name', apiky='', page=1, limit='10'} = req.query;
    console.log(q , nombre, apiky)
  

    res.json({
       nombre
    })
  }

const usuariosPost = async (req=request, res=response) =>{

   const {nombre, cedula ,correo, password, rol,fechacreacion }= req.body;
   const usuario = new Usuario({nombre, cedula, correo, password, rol,fechacreacion:fechaEcuador()});

   // ENCRIPTAR LA CONTRASEÑA
   const salt= bcryptjs.genSaltSync();
   usuario.password= bcryptjs.hashSync(password, salt);
   
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