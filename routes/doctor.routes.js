/*
    /api/doctors
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor.controller');

const { validatorFilds } = require('../middlewares/vaidator-fields');
const { validateJWT } = require('../middlewares/validate-JWT');


const router = Router();
router.get('/', validateJWT, getDoctors);

router.post('/',
    [
        validateJWT,
        check('name', 'the name is require').not().isEmpty(),
        check('hospital', 'the id hospital is valid require').isMongoId(),
        validatorFilds
    ],
    createDoctor
);

router.put('/:id',
    [],
    updateDoctor
);

router.delete('/:id', deleteDoctor);


module.exports = router;