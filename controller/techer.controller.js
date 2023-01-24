const services = require("../services/teacher.services");
const { errorHandler } = require("../middleware/errorHandler");

exports.getTecherByEmailController = async (req, res, next) => {
    try {
        const result = await services.getTecherFindByEmail(req.query.email)
        res.status(200).json({
            status: "Success",
            message: "data fetching Successfully",
            result: result
        })

    } catch (err) {
        errorHandler(res, err)
    }
}
exports.createATeacherController = async (req, res, next) => {
    try {
        const result = await services.createATecherService(req.body)
        console.log(req.body);
        res.status(200).json({
            status: "Success",
            message: "Save a document Successfully",
            // result: result
        })
    }
    catch (err) {
        // res.status(400).json({
        //     status: "failed",
        //     message: err.message
        // })
        errorHandler(res, err)
    }
}


exports.updateATeacherController = async (req, res, next) => {
    try {
        const { email } = req.user
        const user = await services.getTecherFindByEmail(email)
        console.log(user);
        if (user.role != "teacher") {
            return res.status(401).json({
                status: "fail",
                error: "not authorized for this route"
            })
        }
        const result = await services.updateATeacherServices(email, req.body)
        console.log(result);
        // if(modifiedCount)
        res.status(200).json({
            status: "success",
            result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })

    }
}

exports.getTuitionReqController = async (req, res, next) => {
    try {
        const id  = req.user._id
        const teacherId = id.toString()
        console.log(req.user);
        const result = await services.getTuitionService(teacherId)
        res.status(200).json({
            status: "fail",
            found:result.count,
            result:result.result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: error.message

        })
    }
}