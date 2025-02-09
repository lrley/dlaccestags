const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarioDB');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async( req = request, res= response)=>{

    const {correo, password}= req.body;
  
    try {
            // Verificar si el email existe
            const usuario = await Usuario.findOne({correo});
            if(!usuario){
                    return res.status(400).json({
                        msg: 'Usuario / Password no son correctos - correo'
                    });

            }
            // Si el usuario esta activo
            if(!usuario.estado){
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - estado: inactivo'
                });

            }
            // Verificar la contraseña
                const validarPassword = bcryptjs.compareSync(password, usuario.password)
            if(!validarPassword){
                    return res.status(400).json({
                        msg: 'Usuario / Password no son correctos - password'
                    })
            }
            // Generar el JWT
            const token = await generarJWT(usuario.id);
        
            res.json({
               usuario,
               token
            })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'

        })
    }


}

module.exports={
    login
}