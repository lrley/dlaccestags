const {response,request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarioDB');
const { fechaEcuador } = require('../helpers/fechaActual');


const usuariosGet = async(req=request, res=response) =>{

      const {limit=20, desde='0'}= req.query;
      const query= {estado:true}
     /* const usuarios = await Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limit))

      const total= await Usuario.countDocuments(query);
*/
   const [total, usuarios]= await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limit)),
   ])

    res.json({
      total,
      usuarios
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


 const usuariosDelete = async(req=request, res=response) =>{
   const cedula= req.params.cedula;
      console.log(cedula)
      const user= await Usuario.findOne({cedula});
      console.log(user._id)
   
      user.fechaActualizacion= fechaEcuador();
      user.estado= false;
      const usuario= await Usuario.findByIdAndUpdate(user._id, user);
      
   res.json({
    usuario
   })
}

  module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
  }