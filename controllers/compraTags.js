const {response,request} = require('express');
const Compratag = require('../models/compraTagsDB');
//const moment = require('moment-timezone');
const { fechaEcuador } = require('../helpers/fechaActual');




const compraTagsGet = async(req=request, res=response) =>{
    
   const {limit=20, desde='0'}= req.query;
        const query= {estado:true}
       /* const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limit))
  
        const total= await Usuario.countDocuments(query);
  */
     const [total, usuarios]= await Promise.all([
        Compratag.countDocuments(query),
        Compratag.find(query)
        .skip(Number(desde))
        .limit(Number(limit)),
     ])
  
  res.json({
       total,
       usuarios

    })
  }


const compraTagsPost = async (req=request, res=response) =>{
  
  const {idcliente, cliente, factura, numerotag, taghexadecimal, idusuario, usuario}= req.body;
  const compratags= new Compratag({idcliente, cliente, factura, numerotag, taghexadecimal, fechacreacion: fechaEcuador(), idusuario, usuario});
  
  await compratags.save();

  res.json({
     compratags
   })
}


  const compraTagsPut = async (req=request, res=response) =>{
    const numerotag= req.params.id;
    console.log(numerotag)
    const {_id, ...resto }= req.body;
   
    resto.fechacreacion= fechaEcuador();
    const compratags= await Compratag.findByIdAndUpdate(numerotag, resto);

    res.json({
        compratags
     })
 }

 
 const compraTagsDelete = async (req=request, res=response) =>{
  const numerotag= req.params.id;
  console.log(numerotag)
  const compra= await Compratag.findOne({numerotag});
  console.log(compra._id)
 
  compra.fechacreacion= fechaEcuador();
  compra.estado= false;
  const compratags= await Compratag.findByIdAndUpdate(compra._id, compra);

  
   res.json({
   
     compratags
    })
  }


module.exports={
compraTagsGet,
compraTagsPost,
compraTagsPut,
compraTagsDelete
}
