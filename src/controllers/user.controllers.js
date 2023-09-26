const User = require("../models/User.js");
const passport = require("passport");
const sendToken = require('../helpers/jwtToken.helpers')

exports.prueba = async (req, res) => {
    res.status(200).json({
        "success": "Usuario creado prueba",
    })
};

exports.register = async (req, res) => {
  let errors = [];
  const { password, confirm_password } = req.body;
  const username  = req.body.username;
  if (username == "") {
    errors.push({ text: "Debes tener un nombre de usuario" });
  }

  if (password !== confirm_password) {
    errors.push({ text: "las contraseñas no coinciden" });
  }
  console.log(username)

  if (password.length < 4) {
    errors.push({ text: "Contraseña debe tener al menos 4 caracteres" });
  }

  // Look for email coincidence
  const userFound = await User.findOne({ username: username });
  if (userFound) {
    errors.push({ text: "Contraseña debe tener al menos 4 caracteres" });
  }

  if (errors.length > 0){
    res.status(400).json({
        "error": errors
    })
  } else {
    const newUser = new User({ username, password });
    newUser.password = await newUser.cryptPass(password);
    await newUser.save();
    res.status(200).json({
        "success": "Usuario creado correctamente",
        "user": newUser
    })
  }
};


exports.login = async (req, res) => {
    const {username, password} = req.body;
    let errors = []
    if (!username || !password){
        errors.push("Introduce tu nombre de usuario y contraseña")
    }

    const user = await User.findOne({username});

    if(!user) {
        errors.push("El usuario no exste")
    } 

    const passwordCorrect = await user.checkPass(password);
    if(!passwordCorrect) {
        errors.push("El nombre de usuario o contraseña es incorrecto")
    }

    if (errors.length > 0){
        res.status(400).json({
            "error": errors,
        })
    } else {
        sendToken(user, 200, res)
    }
};

exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true, 
        message: 'Logged Out'
    })
};