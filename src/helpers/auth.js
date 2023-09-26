const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Check if user is authenticated
exports.isAuthenticatedUser = async( req, res, next) => {
    const token=req.cookies['token']

    if(!token) {
        res.status(400).json({
            "error": "Debe iniciar sesión primero"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id)

    next()

};