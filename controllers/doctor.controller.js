const { response } = require('express');
const { find } = require('../models/Doctor.model');

const Doctor = require('../models/Doctor.model');


const getDoctors = async (req, res = response) => {
    const doctors = await Doctor.find()
        .populate('user', 'name image')
        .populate('hospital', 'name');
    res.json({
        ok: true,
        doctors: doctors,
    });
}

const createDoctor = async (req, res = response) => {
    const uId = req.uid;
    const hospitalId = req.body.hospital;

    const doctor = new Doctor({
        ...req.body,
        user: uId,
        hospital: hospitalId
    });
    try {
        const doctorDB = await doctor.save();
        res.json({
            ok: true,
            doctor: doctorDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Fatal internal error server.'
        });
    }
   
}

const updateDoctor = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updateDoctor',
    });
}

const deleteDoctor = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteDoctor',
    });
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
}