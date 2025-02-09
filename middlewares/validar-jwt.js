const { request, response } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioDB');

const validarJWT = async (req= request, res=response, next)=>{

const token = req.header('x-token');

console.log(token)

if(!token){
    return res.status(401).json({
        msg:'No hay token en la peticion'
    })
}

try {
        const { uid } =   jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log(uid)

        const usuario = await Usuario.findById(uid);
        console.log(usuario._id)
         if(!usuario){
            return res.status(401).json({
                msg:' TOKEN NO VALIDO - Usuario no existe en Base de datos'         
            })
         }

         //VERIFICAR SI EL UID TIENE ESTADO EN TRUE
            if(!usuario.estado){
                return res.status(401).json({
                    msg:' TOKEN NO VALIDO - Usuario Eliminado no tiene acceso a borrar'         
                })
            }


        req.usuario = usuario;
        next();
 
} catch (error) {
      //  console.log(error);
        res.status(401).json({
            msg:'Token no valido' 
        })


}



}

module.exports = {

    validarJWT

}