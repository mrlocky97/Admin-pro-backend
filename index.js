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

//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto: ', process.env.PORT);
});