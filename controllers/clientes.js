const {response,request} = require('express');
const bcryptjs = require('bcryptjs');
const Cliente = require('../models/clienteDB');
const { fechaEcuador } = require('../helpers/fechaActual');


const clientesGet = async(req=request, res=response) =>{
   
  const {limit=20, desde='0'}= req.query;
  const query= {estado:true};

   const [total, clientes ] = await Promise.all([
      Cliente.countDocuments(query),
      Cliente.find(query)
      .skip(Number(desde))
      .limit(Number(limit)),
   ])



    res.json({
      total,
      clientes,
    })
  }


const clientePost =  async(req=request, res=response) =>{
   const {nombre,cedula,direccion,correo,password,rol,idUsuario,usuario}= req.body;
   const cliente= new Cliente({nombre,cedula,direccion,correo,password,rol,fechacreacion:fechaEcuador(),fechaActualizacion:fechaEcuador(),idUsuario,usuario});
    
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


 const clientePut= async(req=request, res=response) =>{
   const id= req.params.id;
   const {_id, password, google,fechacreacion,correo, ...resto }= req.body;

   //TODO VALIDAR CONTRA BASE DE DATOS
     if(password){
        const salt= bcryptjs.genSaltSync();
        resto.password= bcryptjs.hashSync(password, salt);
     }
        resto.fechaActualizacion=fechaEcuador();
  
     const cliente= await Cliente.findByIdAndUpdate( id , resto );
        console.log(cliente);

    res.json({
        msg: `UPDATE CLIENTE ${id} DEL API CLIENTES controlador update..`,
        cliente
     })
 }


 const clienteDelete = async(req=request, res=response) =>{
   const cedula= req.params.cedula;
         const client= await Cliente.findOne({cedula});
         client.fechaActualizacion= fechaEcuador();
         client.estado= false;
         const cliente= await Cliente.findByIdAndUpdate(client._id, client);
         
      res.json({
       cliente
      })



  }

  module.exports = {
    clientesGet,
    clientePost,
    clientePut,
    clienteDelete,

  }