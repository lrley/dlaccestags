
const {Router}= require('express');
const {check} = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const router =  Router();


router.get('/', usuariosGet );


router.post('/',[
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('password','El Password es obligatorio y mas de 6 caracteres').isLength({min: 6}),
check('correo','El correo no es valido').isEmail(),
check('rol','No es un Rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),


] , usuariosPost)


router.put('/:id',  usuariosPut)

 
router.delete('/:id',  usuariosDelete)







module.exports = router;