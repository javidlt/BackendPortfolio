const sendToken = (user, sCode, res) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 60 * 60  * 1000
        ),
        httpOnly: true
    }

    res.status(sCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });

}

module.exports = sendToken;