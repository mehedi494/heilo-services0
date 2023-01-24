const {
  createReviewRatings,
  getReviewRatings,
  getSingleReviewRatings,
} = require("../services/review_rating.service");

exports.create_review_rating = async (req, res) => {
  try {
    const data = {
      student_id: req.body.student_id,
      teacher_id: req.body.teacher_id,
      review: req.body.review,
      rating: Number(req.body.rating),
    };
    const review_ratings = await createReviewRatings(data);
    res.status(201).json({
      status: "success",
      message: "created successful",
      data: review_ratings,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "failed to create",
      data: error.message,
    });
  }
};

exports.get_review_rating = async (req, res) => {
  try {
    const review_ratings = await getReviewRatings();
    res.status(200).json({
      status: "success",
      data: review_ratings,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "failed to find",
      data: error.message,
    });
  }
};

exports.get_single_review_rating = async (req, res) => {
  try {
    const id = req.params.id;
    const review_ratings = await getSingleReviewRatings(id);
    res.status(200).json({
      status: "success",
      data: review_ratings,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "failed to find",
      data: error.message,
    });
  }
};
