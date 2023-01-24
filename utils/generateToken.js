const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role,
        id:userInfo._id
    }
    const signature = process.env.ACCESS_SECRECT_TOKEN

    const token = jwt.sign(payload, signature, {
        expiresIn: "1 days"
    })
    return token
}