/*
    /api/search
*/

const { Router } = require('express');

const { getShearch, getDocumentColection } = require('../controllers/shearch.controller');
const { validateJWT } = require('../middlewares/validate-JWT');


const router = Router();

router.get('/:cadena', validateJWT, getShearch);
router.get('/colection/:table/:cadena', validateJWT, getDocumentColection);

module.exports = router;