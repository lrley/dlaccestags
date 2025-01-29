const {response,request} = require('express');



const usuariosGet = (req=request, res=response) =>{
    const {q='', nombre='No name', apiky='', page=1, limit='10'} = req.query;
    console.log(q , nombre, apiky)
    res.json({
       msg: 'GET API USUARIOS controlador update....',
       q,
       nombre,
       apiky,
       page,
       limit,
    })
  }

const usuariosPost =  (req=request, res=response) =>{
   const body= req.body;

   console.log(body)
    res.json({
      msg: 'POST API USUARIOS controlador update....',
      body
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