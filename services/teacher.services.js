const { userupdate } = require("../controller/user.controller");
const User = require("../model/User")
const sessionDb = require('../model/Session');
const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Types

exports.getTecherFindByEmail = async (email) => {
    return result = await User.findOne({ email })

}

exports.updateATeacherServices = async (email, body) => {
    // console.log(email, body);
    const result = await User.updateOne({ email }, body);

    return result;
}

exports.getTuitionService = async (id) => {
    console.log(id);
    const result = await sessionDb.find(
        { $and: [{status:"pending"},{ teacherId: id }] }
    )
    const count = result.length;
    console.log(count);
    return {result,count};
}