/*
    Ruta: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { validatorFilds } = require('../middlewares/vaidator-fields');
const { validateJWT } = require('../middlewares/validate-JWT');

const router = Router();

/* este bloque es el controlador cuando hace una peticion a esta ruta
    para mantener el cod mas limpio tada la logica se manda a controllers */
router.get('/', validateJWT, getUsers);

router.post('/', [
    //primer arg nombre del campo, segundo mensajes personalizados de error
        check('name', 'The name is obligatory.').not().isEmpty(),
        check('password', 'The password is obligatory.').not().isEmpty(),
        check('email', 'The email is obligatory.').isEmail(),
        validatorFilds,//es importante siempre colocarlos de ultimos
    ],
    createUser
);
// mandando parametros en la ruta
router.put('/:id', [
        validateJWT,
        check('name', 'The name is obligatory.').not().isEmpty(),
        check('email', 'The email is obligatory.').isEmail(),
        check('role', 'The role is obligatory.').not().isEmpty(),
        validatorFilds,
    ], 
    updateUser
);

router.delete('/:id', validateJWT, deleteUser);

module.exports = router;