const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middleware
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
// variables globales
app.use(express.json())
// rutas
app.use(require('./routes/index.routes'));
// app.use(require('./routes/user.routes'));
app.use(require('./routes/project.routes'));

module.exports = app;