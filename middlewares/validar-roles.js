const { response } = require("express");




const esAdminRole= (req, res = response, next)=> {

        if(req.params.cedula == req.usuario.cedula){
            return res.status(500).json({
                msg:`El usuario ${req.usuario.nombre} no puede eliminarse estando autenticado debe entrar como otro administrador para eliminar a este usuario `
            })
        }

        if(!req.usuario){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token primero'
            })
        }

        const {rol, nombre} = req.usuario
        if(rol!= 'ADMIN_ROL'){
            return res.status(401).json({
                msg: `El usuario ${nombre} no es administrador`
            })
        }
        
next();

}

const tieneRol=(...roles)=>{

    return  (req, res=response, next)=>{

        if(!req.usuario){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token primero'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El usuario ${req.usuario.nombre} no es administrador se requiere estos ${roles}`
            })
        }



        next();
    }

}



module.exports = {
    esAdminRole,
    tieneRol,
}