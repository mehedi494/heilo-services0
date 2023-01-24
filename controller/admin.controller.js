const adminServices = require("../services/admin.services")
exports.homeGet = async (req, res, next) => {
    try {
        const result = await adminServices.homeGetService()
        console.log(result);
        res.status(200).json({
            status: "success",
            result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error
        })

    }
}

exports.adminGetWallateController = async (req, res, next) => {
    try {

        const result = await adminServices.adminGetWallateService()

        //    console.log(result);
        res.status(200).json({
            status: "success",
            topupReq:result.topReq,
            widthdrawReq:result.widdrawReq
        })

    } catch (error) {
        // console.log(error);
        res.status(400).json({
            status: "fail",
            error
        })

    }
}

exports.purchaseReqController = async (req, res, next) => {
    try {
        console.log(req.body);
        const updateData = await adminServices.purchaseReqService(req.body)

        //    console.log(result);
        res.status(200).json({
            status: "success",
            result: updateData
        })

    } catch (error) {
        // console.log(error);
        res.status(400).json({
            status: "fail",
            error
        })

    }
}