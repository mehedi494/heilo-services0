const sessionRoutes = require("express").Router();
const verifyAdmin = require("../../middleware/verifyAdmin");

const sessionController = require("../../controller/session.controllers");

sessionRoutes
  .route("/create-session")
  .post(sessionController.getSessionRequest) //this is for student
  .patch(sessionController.confirmSession); //this is for teacher

sessionRoutes.get("/all-events", sessionController.getTheEvents);

module.exports = sessionRoutes;
