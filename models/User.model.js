const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});

// para modificar el registro del mongo nombre de columnas
UserSchema.method('toJSON', function(){
    // los campos que no se renombran ya no se muestran en el objeto
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;

    return object;
});
 
module.exports = model('User', UserSchema);