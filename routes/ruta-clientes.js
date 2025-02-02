
const {Router}= require('express');
const {check} = require('express-validator');
const { clientesGet, clientePost, clientePut, clienteDelete } = require('../controllers/clientes');
const { validarCampos } = require('../middlewares/validar-campos');
const Rol = require('../models/rolDB');

const router =  Router();


router.get('/',  clientesGet)


router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatorio').not().isEmpty(),
    check('cedula','La cedula es obligatoria 10 caracteres si es ruc 13').isLength({min:10, max:13}),
    check('password','El Password es obligatorio y mas de 6 caracteres').isLength({min: 6}),
    check('correo','El correo no es valido').isEmail(),
    check('rol').custom(async(rol='')=>{
            const existeRol= await Rol.findOne({rol});
            if(!existeRol){
                throw new Error(`El rol ${rol} no esta registrado en la BD`)
            }

   }),
    // check('rol','No es un Rol permitido').isIn(['CLIENTE_ADMIN_ROL','CLIENTE_USER_ROL']),

    validarCampos,
] ,clientePost)


router.put('/:id',  clientePut)

 
router.delete('/:id',  clienteDelete)







module.exports = router;