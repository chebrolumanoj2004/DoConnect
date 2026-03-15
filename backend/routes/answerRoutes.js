const express = require("express");
const router = express.Router();

const answerController = require("../controllers/answerController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/post", authMiddleware, answerController.postAnswer);


router.get("/:questionId", answerController.getAnswers);


router.put("/like/:id", authMiddleware, answerController.likeAnswer);


router.put("/approve/:id", authMiddleware, answerController.approveAnswer);


router.get("/my-answers", authMiddleware, answerController.getMyAnswers);

module.exports = router;