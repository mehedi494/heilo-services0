const reviewRating = require("../model/review_rating");

exports.createReviewRatings = async (data) => {
  const result = await reviewRating(data);
  return result.save();
};

exports.getReviewRatings = async () => {
  return await reviewRating.find({});
};

exports.getSingleReviewRatings = async (id) => {
  return await reviewRating.findOne({ _id: id });
};
