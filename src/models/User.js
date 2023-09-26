const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

UserSchema.methods.cryptPass = async pas => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pas, salt)
};

UserSchema.methods.checkPass = async function(pas) {
    return await bcrypt.compare(pas, this.password);
};

// Return Jwt token 
UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

module.exports = model('User', UserSchema);