
const {Router}= require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { rolesGet, rolesPost, rolesPut, rolesDelete } = require('../controllers/roles');

const router =  Router();


router.get('/', rolesGet );


router.post('/',[
    check('rol','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] , rolesPost)


router.put('/:id',  rolesPut)

 
router.delete('/:id',  rolesDelete)







module.exports = router;