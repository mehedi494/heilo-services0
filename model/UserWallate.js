const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const userWallateSchema = mongoose.Schema({
  _id: {
    type: ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    ref: "User",
  },
  role: {
    required: true,
    type: String,
  },

  balance: {
    type: Number,
    min: 0,
    default: 20,
  },
  transaction: [
    {
      operator: {
        type: String,
        required: true,
      },
      trxId: {
        uniqe: true,
        type: String,
        required: true,
        message: "transactionID is not valid",
      },
      amount: {
        type: Number,
        min: 10,
        required: true,
      },
      status: {
        type: String,
        enum: ["not-paid", "verified", "pending"],
        default: "pending",
      },
      trxType: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "trxType is  'top-up / widthdraw'"],
        enum: ["top-up", "widthdraw"],

        message: "",
      },
    } /* {
        createdAt: { type: Date, default: time }

    } */,
  ],
});

const UserWallate = mongoose.model("UserWallate", userWallateSchema);
module.exports = UserWallate;
