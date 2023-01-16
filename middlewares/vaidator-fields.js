const {response} = require('express');
const { validationResult } = require('express-validator');

const validatorFilds = (req, res = response, next) => {
    // genera todos los errores por el midelware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    // si no hay errores
    next();
}

module.exports = {
    validatorFilds
}