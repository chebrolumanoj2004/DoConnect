const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", questionController.getQuestions);

router.get("/admin/all", authMiddleware, questionController.getAllQuestionsAdmin);

router.post("/ask", authMiddleware, questionController.askQuestion);
router.get("/my-questions", authMiddleware, questionController.getMyQuestions);

router.put("/approve/:id", authMiddleware, questionController.approveQuestion);
router.delete("/decline/:id", authMiddleware, questionController.declineQuestion);
router.put("/resolve/:id", authMiddleware, questionController.resolveQuestion);

router.get("/:id", questionController.getQuestionById);
module.exports = router;