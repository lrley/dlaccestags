
const {Router}= require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { rolesGet, rolesPost, rolesPut, rolesDelete } = require('../controllers/roles');
const {NoexisteRolId,existeRol, NoexisteRol } = require('../helpers/db-validators');

const router =  Router();


router.get('/', rolesGet );


router.post('/',[
    check('rol','El Rol es obligatorio').not().isEmpty(),
    check('rol').custom(existeRol),
    validarCampos,
] , rolesPost)


router.put('/:id',[
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(NoexisteRolId),
    validarCampos,

],rolesPut)

 
router.delete('/:rol',[
    check('rol').custom(NoexisteRol),
    validarCampos,
],rolesDelete)







module.exports = router;