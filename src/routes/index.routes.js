const {Router} = require('express');
const router = Router();
const {defaultFunc} = require('../controllers/index.controllers')

router.get('/', defaultFunc);

module.exports = router;