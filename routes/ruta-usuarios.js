
const {Router}= require('express');
const {check} = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido,existeCedulaUser,existeEmailUser, existeUsuarioPorId } = require('../helpers/db-validators');

const router =  Router();


router.get('/', usuariosGet );


router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El Password es obligatorio y mas de 6 caracteres').isLength({min: 6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(existeEmailUser),
    check('cedula').custom(existeCedulaUser),
    check('rol').custom(esRolValido),
    validarCampos,

] , usuariosPost)


router.put('/:id',[
    check('id').custom(existeUsuarioPorId),
    check('id', 'No es un ID Valido').isMongoId(),
    check('password','El Password es obligatorio y mas de 6 caracteres').isLength({min: 6}),
    check('rol').custom(esRolValido),
validarCampos,

],usuariosPut)

 
router.delete('/:id',  usuariosDelete)







module.exports = router;