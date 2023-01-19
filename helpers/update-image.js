const fs = require('fs');

const Hospital = require('../models/Hospital.model');
const User = require('../models/User.model');
const Doctor = require('../models/Doctor.model');

const deleteImage = (path) => {
    if (fs.existsSync(path)) fs.unlinkSync(path);// si existe se borra
}

// to do: hacer validacion de si no exite medico no dejar grabar
const updateImage = async (type, id, nameFile) => {
    switch(type) {
        case 'doctors':
                const doctor = await Doctor.findById(id);
                if (!doctor) return false;
                const oldPath = `./uploads/${type}/${doctor.image}`;
                deleteImage(oldPath);
                doctor.image = nameFile;
                await doctor.save();
                return true;
            break;
        case 'hospitals':
                const hospital = await Hospital.findById(id);
                if (!hospital) return false;// no existe hospital por id
                const oldPathHospital = `./uploads/${type}/${hospital.image}`;
                deleteImage(oldPathHospital);
                hospital.image = nameFile;
                await hospital.save();
                return true;
            break;
        case 'users':
                const user = await User.findById(id);
                if (!user) return false;// no existe user por id
                const oldPathUser = `./uploads/${type}/${user.image}`;
                deleteImage(oldPathUser);
                user.image = nameFile;
                await user.save();
                return true;
            break;
        default:
                return false;
            break;
    }

}

module.exports = {
    updateImage,
}