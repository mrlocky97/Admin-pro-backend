/*
    /api/doctors
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital.controller');

const { validatorFilds } = require('../middlewares/vaidator-fields');
const { validateJWT } = require('../middlewares/validate-JWT');


const router = Router();
router.get('/', validateJWT, getHospitals);

router.post('/', 
    [
        validateJWT,
        check('name', 'the name is require').not().isEmpty(),
        validatorFilds
    ],
    createHospital
);

router.put('/:id', 
    [],
    updateHospital
);

router.delete('/:id', deleteHospital);


module.exports = router;