const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

router.post("/add", commentController.addComment);

router.get("/:answerId", commentController.getComments);

module.exports = router;