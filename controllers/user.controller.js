const { response } = require('express');
const bcrypt = require('bcrypt');// importa todas las funciones de la libreria

const User = require('../models/User.model');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
    // seleccion de campos de un registro de mongo
    const users = await User.find({}, 'name email role google');
    res.json({
        ok: true,
        msg: 'Get all users.',
        users,
        uid: req.uid // lo trae del middleware y sirve para compartir uno en las peticiones
    });
}

// el response es para el tipado 
const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // nota si es una promesa es necesario un await para que no avance hasta completar esa linea
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

        const user = new User(req.body);
        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        //guardando usuario
        await user.save();
        // generar un token
        const token = await generateJWT(user.id);
        res.json({
            ok: true,
            msg: 'Creating a new user.',
            user: user,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno api...'
        });
    }

}

const updateUser = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const existUserDB = await User.findById( uid );
        if (!existUserDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Error: no user exist.'
            });
        }

        const {password, google, email, ...fields} = req.body;
        if (existUserDB.email !== email) {
            const existEmail = await User.findOne({email});
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email already exists.'
                });
            }
        }
        fields.email = email;
        // TODO: validar token y comprobar si es el usuario correcto
        //updating user
        // delete fields.password; // borramos los campos que no queremos actualizar
        // delete fields.google;
        // actualizamos el usuario
        const userUpdate = await User.findByIdAndUpdate( uid, fields, { new: true } );

        res.json({
            ok: true,
            user: userUpdate
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error internal updating user.'
        })
    }
}

const deleteUser = async(req, res = response) => {
    const uId = req.params.id;
    try {
        const userDb = await User.findById(uId);
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found.'
            });
        }
        await User.findByIdAndDelete(uId);
        res.status(200).json({
            ok: true,
            id: uId,
            msg: 'User successfully delete.'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Internal error.'
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}