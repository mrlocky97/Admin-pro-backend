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
    const doctorId = req.params.id;
    try {
        doctorDB = await Doctor.findById(doctorId);
        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Error doctor not found.'
            })
        }
        const doctorUpdate = {
            ...req.body
        }
        const newDoctorUpdate = await Doctor.findByIdAndUpdate(doctorId, doctorUpdate, {new: true});
        res.json({
            ok: true,
            msg: 'Successful update doctor.',
            newDoctorUpdate
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error insternal serve.',
            err: error
        })
    }
}

const deleteDoctor = async (req, res = response) => {
    const doctorId = req.params.id;
    try {
        const doctorDB = await Doctor.findById(doctorId);
        if (!doctorDB){
            return res.status(404).json({
                ok: false,
                msg: "Error: Doctor not found."
            });
        }
        await Doctor.findByIdAndDelete(doctorId);
        res.json({
            ok: true,
            msg: 'Doctor successfully deleted.',
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Error: internal server error.',
            err: error
        });
    }
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
}