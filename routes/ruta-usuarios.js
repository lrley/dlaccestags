
const {Router}= require('express');
const {check} = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const Rol = require('../models/rolDB');
const { validarCampos } = require('../middlewares/validar-campos');

const router =  Router();


router.get('/', usuariosGet );


router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El Password es obligatorio y mas de 6 caracteres').isLength({min: 6}),
    check('correo','El correo no es valido').isEmail(),
    check('rol').custom(async(rol='')=>{
                const existeRol= await Rol.findOne({rol});
                if(!existeRol){
                    throw new Error(`El rol ${rol} no esta registrado en la BD`)
                }
    
       }),
    validarCampos,

] , usuariosPost)


router.put('/:id',  usuariosPut)

 
router.delete('/:id',  usuariosDelete)







module.exports = router;