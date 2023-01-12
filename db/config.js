const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        // const Cat = mongoose.model('Cat', { name: String });

        // const kitty = new Cat({ name: 'Zildjian' });
        // kitty.save().then(() => console.log('meow'));
        console.log("Data base online...");
    } catch (error) {
        console.log(error);
        throw new Error("Error al iniciar la base de datos",error);
    }

}

module.exports = {
    dbConnection
}