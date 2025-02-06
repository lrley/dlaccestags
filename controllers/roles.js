const {response,request} = require('express');
const Rol = require('../models/rolDB');



const rolesGet = async(req=request, res=response) =>{
    
  
     const {limit=20, desde='0'}= req.query;
       const query= {estado:true}
   
    const [ total,roles]= await Promise.all([
       Rol.countDocuments(query),
       Rol.find(query)
       .skip(Number(desde))
       .limit(Number(limit)),
    ])
 
     res.json({
       total,
       roles
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
 
 
  const rolesDelete = async (req=request, res=response) =>{
    const rol= req.params.rol;
    console.log(rol)

    const roles= await Rol.findOne({rol});
    console.log(roles._id)
 
   
    roles.estado= false;
    const rolEliminado= await Rol.findByIdAndUpdate(roles._id, roles);
    
 res.json({
  rolEliminado
 })
   }
 
   module.exports={
    rolesGet,
    rolesPost,
    rolesPut,
    rolesDelete,

   }