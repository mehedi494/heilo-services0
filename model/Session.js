const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const text = new Date();

// const date = text.toLocaleString()
const sessionSchema = mongoose.Schema({
  teacherId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  studentId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  summary: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timeZone: {
    type: String,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  hourlyRate: {
    type: Number,
    min: 0,
    default: 0,
  },
  status: {
    type: String,
    enum: ["accept", "reject", "pending"],
    default: "pending",
  },
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
