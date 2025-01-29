const {response,request} = require('express');


const compraTagsGet = (req=request, res=response) =>{
    res.json({
       msg: 'GET API COMPRATAG controlador update..',

    })
  }


  const compraTagsPost =  (req=request, res=response) =>{
   const body= req.body;
   console.log(body)
     res.json({
       msg: 'POST API COMPRATAG controlador update..',
       body,
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
