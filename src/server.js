const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// Configuración de CORS
const corsOptions = {
    origin: 'https://backend-portfolio-lemon.vercel.app/', // Cambia esto por la URL de tu aplicación React en desarrollo
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilita las credenciales si es necesario
  };

  

// middleware
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOptions));

// variables globales
app.use(express.json())
// rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/project.routes'));

module.exports = app;