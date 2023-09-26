const { Router } = require("express");
const router = Router();
const {prueba,register,login, logout} = require('../controllers/user.controllers');

router.get('/prueba', prueba);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;