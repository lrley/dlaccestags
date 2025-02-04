const {response,request} = require('express');
const Compratag = require('../models/compraTagsDB');
const moment = require('moment-timezone');
const { fechaEcuador } = require('../helpers/fechaActual');



const compraTagsGet = (req=request, res=response) =>{
    
  
  
  res.json({
       msg: 'GET API COMPRATAG controlador update..',

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


  const compraTagsPut = async(req=request, res=response) =>{
    const numerotag= req.params.id;
    console.log(numerotag)
    const {_id, ...resto }= req.body;
   
    resto.fechacreacion= fechaEcuador();
    const compratags= await Compratag.findByIdAndUpdate(numerotag, resto);
    


    res.json({
        compratags
     })
 }

 
 const compraTagsDelete = (req=request, res=response) =>{
  const id= req.params.id;
  console.log(id)
   res.json({
       msg: `DELETE COMPRATAGS ${id} DEL API COMPRATAGS controlador update..`,
       id
    })
  }


module.exports={
compraTagsGet,
compraTagsPost,
compraTagsPut,
compraTagsDelete
}
