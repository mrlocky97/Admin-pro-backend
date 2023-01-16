const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        // parametro de firma
        const payLoad = {
            uid
        }
        jwt.sign(payLoad, process.env.JWT_SECRET, {
            expiresIn: '168h'
        }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve( token );
        });
    });
}

module.exports = {
    generateJWT
}