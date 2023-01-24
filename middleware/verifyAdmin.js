const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = async (req, res, next) => {
    try {

        const token = req.headers?.authorization?.split(" ")?.[1];

        if (!token) {
            return res.status(401).json({
                status: "fail",
                error: "you are not logged in! "
            })
        }
        const decodedToken =  jwt.verify(token, process.env.ACCESS_SECRECT_TOKEN);

        // console.log("decoded ",decodedToken);
        const userinfo = await User.findById({ _id: decodedToken.id })
        
        if (userinfo.role == "admin" && userinfo.email == decodedToken.email) {
            return next()
        }

        res.status(403).json({
            message: "unauthorized route🙂!"
        })
        


    } catch (error) {
        res.status(403).json({
            status: "fail",
            error: "Internal Server Error"
        })
    }
}