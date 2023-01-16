const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    // leer token
    const token = req.header('x-token');
    // verificando token en header
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token exist.'
        });
    }
    // verificando token
     try {
         const { uid } = jwt.verify(token, process.env.JWT_SECRET);
         req.uid = uid;
         next();
     } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: ' Invalid token.'
        });
     }
}

module.exports = {
    validateJWT
}