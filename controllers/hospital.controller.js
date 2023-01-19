const { response } = require('express');
const { findById, find } = require('../models/Hospital.model');

const Hospital = require('../models/Hospital.model');
const User = require('../models/User.model');

const getHospitals = async (req, res = response) => {

    const hospitals = await Hospital.find()
    // apunta a la 2 tabla y el segundo parametro son los campos quequiere sacar
        .populate('user', 'name image');
    res.json({
        ok: true,
        hospitals: hospitals
    });
}

const createHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });
    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hsopital: hospitalDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Fatal internal server error.'
        });
    }
}

const updateHospital = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updateHospital',
    });
}

const deleteHospital = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteHospital',
    });
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,
}