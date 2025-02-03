const {response,request} = require('express');
const Compratag = require('../models/compraTagsDB');
const moment = require('moment-timezone');
const { fechaEcuador } = require('../helpers/fechaActual');



const compraTagsGet = (req=request, res=response) =>{
    
  
  
  res.json({
       msg: 'GET API COMPRATAG controlador update..',

    })
  }

  /*
const crearFechaEcuador = () => {
  return moment().tz('America/Guayaquil').toDate();
};
*/

const compraTagsPost = async (req=request, res=response) =>{
  
  const {idcliente, cliente, factura, numerotag, taghexadecimal, idusuario, usuario}= req.body;
  const existeTag= await Compratag.findOne({numerotag});
  if(existeTag){
     console.log(`No se grabo la informacion porque el Tag ${numerotag} ya existe`);
     return res.status(400).json({
        msg: 'Este Tag ya existe',
        numerotag
     });
  }

   //Obtener fecha y hora de Ecuador
  // const fechaEcuador = moment().tz('America/Guayaquil');
   //Restar 5 horas al crear la fecha para MongoDB
   //const fechaAGuardar = new Date(fechaEcuador.subtract(5, 'hours').format());

  const compratags= new Compratag({idcliente, cliente, factura, numerotag, taghexadecimal, fechacreacion: fechaEcuador(), idusuario, usuario});
  
  await compratags.save();

  res.json({
     compratags
   })
}


  const compraTagsPut =(req=request, res=response) =>{
    const id= req.params.id;
   console.log(id)
    res.json({
        msg: `UPDATE COMPRATAGS ${id} DEL API COMPRATAGS controlador update..`,
        id
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
