const { response } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User.model');
const { generateJWT } = require('../helpers/jwt')

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const userDB = await User.findOne({ email});
        // verificando email
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found.'
            });
        }
        // verificando password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password.'
            });
        }

        // generar un token
        const token = await generateJWT( userDB.id );
        res.json({
            ok: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Fatal internal error.'
        });
    }
}

module.exports = {
    login,
}