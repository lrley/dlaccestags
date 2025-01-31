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
    console.log(role)

    const existeRol= await Rol.findOne({rol});
    if(existeRol){
        console.log(`No se grabo el Rol porque ya existe`)
        return res.status(400).json({
           msg:'Ese Rol ya esta registrado',
           rol
        });
    }
    console.log(existeRol)
   //GUARDAR EN BASE DE DATOS
    await role.save();



    res.json({
        msg: 'POST desde Roles',
        role
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