const User = require("../model/User");
const UserWallate = require("../model/UserWallate");
const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaType.ObjectId;

exports.getAllUserService = async (fields) => {
  return await User.find({}).sort({ role: fields });
};

exports.singup = async (data) => {
  const result = await User.create(data);
  let id = result._id.toString();
  // console.log(id)

  const creatWallate = await UserWallate.create({
    _id: id,
    email: result.email,
    role: result.role,
  });
  console.log(creatWallate);

  return { result, creatWallate };
};
// exports.createWallate = async (data) => {
//     const wallate = await UserWallate.create(data)
//     return wallate
// }

exports.findUserByEmail = async (email) => {
  let result = await User.findOne({ email });
  return result;
};
// exports.findUserById = async (id) => {
//     let result = await User.findOne({ id })
//     return result;
// }

exports.resetPassService = async (data) => {
  const { email, password } = data;
  return (result = await User.updateOne({ email }, { password: password }));
};

exports.passwordUpdate = async (id, data) => {
  console.log(id, data);
  const result = await User.updateOne(
    { _id: id },
    {
      $set: {
        password: data,
      },
    },
    { runValidators: true }
  );
  console.log(result);
  return result;
};
