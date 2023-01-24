const user = require("../model/User");
const userWallate = require("../model/UserWallate");
const sessionDb = require("../model/Session");

exports.onDemangetAllByFilter = async (filter) => {
  // console.log(filter);

  const result = await user
    .aggregate([
      {
        $match: filter,
      },
    ])
    .project({
      name: 1,
      "education.currentInstitution.name": 1,
      tuitionSubjects: 1,
      hourlyRate: 1,
      gender: 1,
    });

  const count = await user.aggregate([
    {
      $match: filter,
    },
    {
      $count: "found",
    },
  ]);

  return { result, count };
};

exports.getStudentFindByEmail = async (email) => {
  return (result = await user.findOne({ email }));
};

exports.updaterStudentProfile = async (email, data) => {
  return (result = await user.updateOne({ email }, data));
};

exports.topUp_ReqService = async (data) => {
  const { trxId, trxType, _id, amount, operator } = data;

  const exits = await userWallate.findById({ _id });
  console.log(exits);
  const filter = exits.transaction.filter((obj) => obj.trxId == trxId);
  // console.log(filter);

  if (filter.length) {
    return { status: "fail", message: "Already apply  this TransactionId 👎" };
  }

  const result = await userWallate.updateOne(
    { _id },
    { $push: { transaction: { trxId, amount, operator, trxType } } }
  );
  // console.log(result);
  return result;
};

exports.getWallateService = async (user) => {
  const { email } = user;
  const result = await userWallate.find({ email: email });

  return result;
};

exports.tuitionReqService = async (data) => {
  const result = await sessionDb.create(data);
  return result;
};
