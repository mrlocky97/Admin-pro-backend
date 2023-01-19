const { response } = require('express');

const Hospital = require('../models/Hospital.model');
const User = require('../models/User.model');
const Doctor = require('../models/Doctor.model');

// todo la expresion no funciona bien
const getShearch = async (req, res = response) => {
    const cadena = req.params.cadena;// al ser un paramatro por la url se recoge en params
    const regex = new RegExp(cadena, 'i');

    const [users, doctors, hospitals] = await Promise.all([
        User.find({ name: regex }),
        Doctor.find({ name: regex }),
        Hospital.find({ name: regex }),
    ]);

    res.json({
        ok: true,
        word: cadena,
        users,
        doctors,
        hospitals
    })
}

const getDocumentColection = async (req, res = response) => {
    const table = req.params.table;
    const cadena = req.params.cadena;
    const regex = new RegExp(cadena, 'i');
    let data = [];

    switch (table) {
        case 'doctors':
                data = await Doctor.find({ name: regex })
                    .populate('user', 'name uid')
                    .populate('hospital', 'name image');

            break;
        case 'hospitals':
                data = await Hospital.find({ name: regex })
                    .populate('user', 'name uid');
            break;
        case 'users':
                data = await User.find({ name: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Error: Dont exist table.'
            });
    }

    res.json({
        ok: true,
        result: data
    });
}

module.exports = {
    getShearch,
    getDocumentColection
}