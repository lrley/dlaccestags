
const {Router}= require('express');
const {check} = require('express-validator');
const { clientesGet, clientePost, clientePut, clienteDelete } = require('../controllers/clientes');
const { validarCampos } = require('../middlewares/validar-campos');
const Rol = require('../models/rolDB');
const { esRolValido,existeCedulaCliente,existeCorreoCliente,existeClientePorId, NoexisteCedulaCliente } = require('../helpers/db-validators');

const router =  Router();


router.get('/',  clientesGet)


router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatorio').not().isEmpty(),
    check('cedula','La cedula es obligatoria 10 caracteres si es ruc 13').isLength({min:10, max:13}),
    check('cedula').custom(existeCedulaCliente),
    check('password','El Password es obligatorio y mas de 6 caracteres').isLength({min: 6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(existeCorreoCliente),
    check('rol').custom(esRolValido),
    validarCampos,
] ,clientePost)


router.put('/:id',[
    check('password','El Password es obligatorio y mas de 6 caracteres').isLength({min: 6}),
    check('cedula','La cedula es obligatoria 10 caracteres si es ruc 13').isLength({min:10, max:13}),
    check('id').custom(existeClientePorId),
    check('id', 'No es un ID Valido').isMongoId(),
    check('rol').custom(esRolValido),
    validarCampos,
],clientePut)

 
router.delete('/:cedula',[
    check('cedula').custom(NoexisteCedulaCliente),
    validarCampos,
],clienteDelete)







module.exports = router;