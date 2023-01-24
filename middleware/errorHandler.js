module.exports.errorHandler = (res,err) =>{
    if (err) {
        res.status(400).json({
            status: " failed",
            message: err.message
        })
    }
    else {
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            
        })
    }
}