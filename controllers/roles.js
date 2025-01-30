const {response,request} = require('express');



const rolesGet = (req=request, res=response) =>{
    res.json({
        msg: 'GET desde Roles',
        
    })
  }



  const  rolesPost=(req = request, res = response)=>{

    const body = req.body;

    res.json({
        msg: 'POST desde Roles',
        body
    })

  }


  const rolesPut = (req=request, res= response) =>{
    const id= req.params.id;
     res.json({
         msg: `UPDATE desde Roles`,
         id
      })
  }
 
 
  const rolesDelete = (req=request, res=response) =>{
    const id= req.params.id;
     res.json({
         msg: `DELETE desde Roles`,
         id         
      })
   }
 
   module.exports={
    rolesGet,
    rolesPost,
    rolesPut,
    rolesDelete,

   }