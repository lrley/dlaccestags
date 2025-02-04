const {response,request} = require('express');
const Rol = require('../models/rolDB');



const rolesGet = (req=request, res=response) =>{
    res.json({
        msg: 'GET desde Roles',
        
    })
  }

  const  rolesPost= async(req = request, res = response)=>{

    const {rol} = req.body;
    const role= new Rol({rol});
    
   //GUARDAR EN BASE DE DATOS
    await role.save();

    res.json({
        msg: 'POST desde Roles',
        role
    })

  }

  const rolesPut = async(req=request, res= response) =>{
    const id= req.params.id;
    const { _id, ...resto }= req.body;

    console.log(id, resto)
    const role= await Rol.findByIdAndUpdate( id , resto );
    console.log(resto)
    

    res.json({
         msg: `UPDATE desde Roles`,
         resto
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