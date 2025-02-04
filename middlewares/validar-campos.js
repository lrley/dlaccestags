const {validationResult}= require('express-validator')

/**
 * 
 * @param {req} req 
 * @param {res} res 
 * @param {next} next 
 * @returns next()
 * toos los models la utilizan para verificar campos 
 */
const validarCampos=(req, res,next)=>{

    const errors= validationResult(req)
   // console.log(errors)
    if( !errors.isEmpty() ){
       return res.status(400).json(errors);
    }

    next();

}


module.exports={
    validarCampos,
}