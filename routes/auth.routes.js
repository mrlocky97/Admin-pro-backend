/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validatorFilds } = require('../middlewares/vaidator-fields');

const router = Router();

router.post('/',
    [
        check('password', 'The password is obligatory.').not().isEmpty(),
        check('email', 'The email is obligatory.').isEmail(),
        validatorFilds
    ],
    login
);

module.exports = router