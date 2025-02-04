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

   const {nombre, cedula ,correo, password, rol,fechacreacion,fechaActualizacion }= req.body;
   const usuario = new Usuario({nombre, cedula, correo, password, rol,fechacreacion:fechaEcuador(),fechaActualizacion:fechaEcuador()});

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

const usuariosPut = async(req=request, res= response) =>{
   const id= req.params.id;
   const {_id, password, google,fechacreacion,correo, ...resto }= req.body;
    
   //TODO VALIDAR CONTRA BASE DE DATOS
   if(password){
      const salt= bcryptjs.genSaltSync();
      resto.password= bcryptjs.hashSync(password, salt);
   }
      resto.fechaActualizacion=fechaEcuador();

   const usuario= await Usuario.findByIdAndUpdate( id , resto );
      console.log(usuario);
      

    res.json({
        usuario
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