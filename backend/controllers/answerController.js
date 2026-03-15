const Answer = require("../models/Answer");
const Question = require("../models/Question");


exports.postAnswer = async (req, res) => {

  try {

    const { questionId, answer } = req.body;

    const question = await Question.findById(questionId);

    if (question.status === "resolved") {
      return res.status(400).json({
        message: "This discussion is closed"
      });
    }

    const newAnswer = new Answer({
      questionId,
      answer,
      userId: req.user.id
    });

    await newAnswer.save();

    res.status(201).json({
      message: "Answer posted successfully",
      newAnswer
    });

  } catch (error) {
    res.status(500).json(error);
  }


};



exports.getAnswers = async (req, res) => {

  try {

    const answers = await Answer.find({
      questionId: req.params.questionId
    });

    res.json(answers);

  } catch (error) {
    res.status(500).json(error);
  }

};




exports.likeAnswer = async (req, res) => {

  try {

    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const userId = req.user.id;

    if (answer.likedUsers.includes(userId)) {
      return res.status(400).json({
        message: "You already liked this answer"
      });
    }

    answer.likes += 1;
    answer.likedUsers.push(userId);

    await answer.save();

    res.json(answer);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

};


exports.approveAnswer = async (req, res) => {

  try {

    const answer = await Answer.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    res.json({
      message: "Answer approved",
      answer
    });

  } catch (error) {
    res.status(500).json(error);
  }

};




exports.getMyAnswers = async (req, res) => {

  try {

    const answers = await Answer.find({
      userId: req.user.id
    });

    res.json(answers);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

};