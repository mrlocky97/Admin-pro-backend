const express = require('express');
require('dotenv').config();

const cors = require('cors');
const { dbConnection } = require('./db/config');

//crea el servidor de express
const app = express();
// base de datos
dbConnection();
//configurar CORS
app.use(cors());
// carpeta publica
app.use(express.static('public'))
// lectura y parseo body
app.use(express.json());

//rutas
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/hospital', require('./routes/hospital.routes'));
app.use('/api/doctors', require('./routes/doctor.routes'));
app.use('/api/search', require('./routes/Search.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/login/google', require('./routes/google.routes'));


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto: ', process.env.PORT);
});