const {Router}= require('express');
const {check} = require('express-validator');
const { compraTagsGet, compraTagsPost, compraTagsPut, compraTagsDelete } = require('../controllers/compraTags');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeTag, existeTagPorId, NoexisteTag } = require('../helpers/db-validators');

const router = Router();

router.get('/', compraTagsGet )


router.post('/',[
    check('idcliente','El IdCliente es obligatorio').not().isEmpty(),
    check('cliente','El nombre del cliente es obligatorio').not().isEmpty(),
    check('factura','El numero de Factura es obligatorio').not().isEmpty(),
    check('numerotag','El Numero de Tags es obligatorio').not().isEmpty(),
    check('numerotag').custom(existeTag),
    check('taghexadecimal','El Codigo en Hexadecimal es obligatorio').not().isEmpty(),
    check('idusuario','El idUsuario es obligatorio').not().isEmpty(),
    check('usuario','El nombre del Usuario es obligatorio').not().isEmpty(),
    validarCampos,


],compraTagsPost )


router.put('/:id',[
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeTagPorId),
    validarCampos,

],compraTagsPut)

 
router.delete('/:id',[
    check('id').custom(NoexisteTag),
    validarCampos,
] ,compraTagsDelete)







module.exports = router;