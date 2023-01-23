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
    const hopitalId = req.params.id;
    try {  
        const hopitalDB = await Hospital.findById(hopitalId);
        if (!hopitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hopital not found.'
            });
        }
        // cuando se actualizan varias columnas del objeto
        const updateHospital = {
            ...req.body,
        }
        //{new: true} regresa el documento actualizado
        const newHopitalUpdate = await Hospital.findByIdAndUpdate(hopitalId, updateHospital, { new: true});
        res.json({
            ok: true,
            msg: 'updateHospital',
            newUpdateHospital: newHopitalUpdate
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Fatal internal error server.',
            err: error
        });
    }
 
}

const deleteHospital = async (req, res = response) => {
    const hospitalId = req.params.id;
    try {
        const hospitalDB = Hospital.findById(hospitalId);
        if (!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'Error: Hospital not found'
            });
        }
        await Hospital.findByIdAndDelete(hospitalId);
        res.json({
            ok: true,
            msg: 'Hospital successfully deleted.',
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error internar server error.',
            err: error
        })
    }
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,
}