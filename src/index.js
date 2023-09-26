const app = require('./server');
require('dotenv').config();
require('./db');

app.listen(app.get('port'), ()=> {
    console.log("Servidor activo en puerto " + app.get('port'))
})