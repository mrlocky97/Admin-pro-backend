/*
    /api/upload
*/

const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { uploadImage, returnImage } = require('../controllers/upload.controller');
const { validateJWT } = require('../middlewares/validate-JWT');


const router = Router();
router.use(fileUpload());

router.put('/:type/:id', validateJWT, uploadImage);
router.get('/:type/:image', validateJWT, returnImage);

module.exports = router;