const {response,request} = require('express');



const clientesGet = (req=request, res=response) =>{
   
    res.json({
       msg: 'GET API CLIENTE controlador update..',

    })
  }


const clientePost =  (req=request, res=response) =>{
   const body= req.body;
   console.log(body)
    res.json({
      msg: 'POST API CLIENTE controlador update',
      body,
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