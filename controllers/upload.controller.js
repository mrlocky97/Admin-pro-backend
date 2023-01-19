const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const Hospital = require('../models/Hospital.model');
const User = require('../models/User.model');
const Doctor = require('../models/Doctor.model');

const { updateImage } = require('../helpers/update-image');


const uploadImage = async (req, res = response) => {
    const type = req.params.type;
    const id = req.params.id;
    // validando el tipo
    const validType = ['hospitals', 'users', 'doctors'];
    if (!validType.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'Error: Type data invalid.'
        });
    }
    // valida si existe un archivo a subir
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg:'No files were uploaded.'
        });
    }
    //procesar imagen
    const file = req.files.image;
    const cutName = file.name.split('.');
    const extension = cutName[cutName.length - 1];
    //validando extension
    const extensionValid = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionValid.includes(extension)){
        return res.status(400).json({
            ok: false,
            msg: 'Error: invalid extension image.'
        });
    }
    //generar nombre de imagen
    const nameFile = `${uuidv4()}.${extension}`
    // creando path para guardar el file
    const path = `./uploads/${type}/${nameFile}`
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err){
            return res.status(500).json({
                ok: false,
                error: err,
                msg: 'Error to move image'
            });
        }
        // actualizamos la base de datos
        updateImage(type, id, nameFile);
        res.json({
            ok: true,
            msg: 'File uploaded!',
            nameImage: nameFile
        });
    });
}

const returnImage = (req, res = response) => {
    const type = req.params.type;
    const image = req.params.image;
    const pathImage = path.join(__dirname, `../uploads/${type}/${image}`);
    const defaultImage = path.join(__dirname, `../uploads/no-image-avalible.jpg`);
    // imagen por defecto
    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    }else {
        res.sendFile(defaultImage);
    }
}

module.exports = {
    uploadImage,
    returnImage
}