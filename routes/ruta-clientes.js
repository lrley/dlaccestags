
const {Router}= require('express');
const { clientesGet, clientePost, clientePut, clienteDelete } = require('../controllers/clientes');

const router =  Router();


router.get('/',  clientesGet)


router.post('/', clientePost)


router.put('/:id',  clientePut)

 
router.delete('/:id',  clienteDelete)







module.exports = router;