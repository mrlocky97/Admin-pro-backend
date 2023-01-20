const { response } = require('express');

const User = require('../models/User.model');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const signIn = async (req, res = response) => {
    try {
        // const googleUser = await googleVerify(req.body.token);
        const { email, name, picture } = await googleVerify(req.body.token);
        const userDB = await User.findOne({email});
        let user;
        if (!userDB) {
            user = new User({
                name: name,
                email: email,
                password: '123',
                img: picture,
                google: true
            });
        } else {
            user = userDB;
            user.google = true;
        }
        // guardamos usuario
        await user.save();
        // generamos token
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            email: email,
            name: name,
            image: picture,
            token: token,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: 'Internal error service signIn google',
        });
    }
  
}

module.exports = {
    signIn,
}