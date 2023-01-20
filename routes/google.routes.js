const { Router } = require('express');
const { check } = require('express-validator');

const { validatorFilds } = require('../middlewares/vaidator-fields');

const { signIn } = require('../controllers/google.controller');


const router = Router();

router.post('/', [
    check('token', 'Google token is required.').not().isEmpty(),
    validatorFilds
], signIn);

module.exports = router;