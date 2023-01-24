const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// const date = text.toLocaleString()
const tempDbSchema = mongoose.Schema({
  sessionId: {
    type: ObjectId,
    ref: "Session",
  },
  order_money: {
    type: Number,
    required: true,
  },
  generated_link: {
    type: String,
    //required: true,
  },
});

const tempDB = mongoose.model("tempDb", tempDbSchema);
module.exports = tempDB;
