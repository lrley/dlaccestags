const {Router}= require('express');
const { compraTagsGet, compraTagsPost, compraTagsPut, compraTagsDelete } = require('../controllers/compraTags');

const router = Router();

router.get('/', compraTagsGet )


router.post('/',compraTagsPost )


router.put('/:id', compraTagsPut)

 
router.delete('/:id', compraTagsDelete)







module.exports = router;