const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// const date = text.toLocaleString()
const review_rating = mongoose.Schema(
  {
    student_id: {
      type: ObjectId,
      ref: "User",
    },
    teacher_id: {
      type: ObjectId,
      ref: "User",
    },
    review: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const reviewRating = mongoose.model("review_rating", review_rating);
module.exports = reviewRating;
