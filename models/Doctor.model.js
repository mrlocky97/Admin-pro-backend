const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        require: true,
        type: Schema.Types.ObjectId,// relacion entre schemas 
        ref: 'User'// debe ser igual al model export del objeto
    },
    hospital: {
        require: true,
        type: Schema.Types.ObjectId,// relacion entre schemas 
        ref: 'Hospital'// debe ser igual al model export del objeto
    },
});

// para modificar el registro del mongo nombre de columnas
DoctorSchema.method('toJSON', function () {
    // los campos que no se renombran ya no se muestran en el objeto
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Doctor', DoctorSchema);