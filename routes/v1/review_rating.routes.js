const {
  create_review_rating,
  get_review_rating,
  get_single_review_rating,
} = require("../../controller/review_rating.controller");

const review_rating_routes = require("express").Router();

review_rating_routes
  .route("/")
  .post(create_review_rating)
  .get(get_review_rating);

review_rating_routes.route("/:id").get(get_single_review_rating);

module.exports = review_rating_routes;
