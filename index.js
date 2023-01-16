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
// lectura y parseo body
app.use(express.json());

//rutas
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/login', require('./routes/auth.routes'));


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto: ', process.env.PORT);
});