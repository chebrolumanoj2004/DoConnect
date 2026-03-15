const Question = require("../models/Question");
const Answer = require("../models/Answer");


exports.askQuestion = async (req, res) => {

  try {

    const { title, description } = req.body;

    const question = new Question({
      title,
      description,
      userId: req.user.id,
      approved: false
    });

    await question.save();

    res.status(201).json(question);

  } catch (error) {

    res.status(500).json(error);

  }

};


exports.getQuestions = async (req, res) => {

  try {

    const questions = await Question.find({
      approved: true
    });

    res.json(questions);

  } catch (error) {

    res.status(500).json(error);

  }

};


exports.getAllQuestionsAdmin = async (req, res) => {

  try {

    const questions = await Question.find();

    res.json(questions);

  } catch (error) {

    res.status(500).json(error);

  }

};


exports.approveQuestion = async (req, res) => {

  try {

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    res.json({
      message: "Question approved",
      question
    });

  } catch (error) {

    res.status(500).json(error);

  }

};



exports.declineQuestion = async (req, res) => {

  try {

    await Question.findByIdAndDelete(req.params.id);

    res.json({
      message: "Question declined"
    });

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.resolveQuestion = async (req, res) => {

  try {

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );

    res.json({
      message: "Question marked as resolved",
      question
    });

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.getMyQuestions = async (req, res) => {

  try {

    const questions = await Question.find({
      userId: req.user.id
    });

    const questionsWithAnswers = await Promise.all(
      questions.map(async (q) => {

        const answers = await Answer.find({
          questionId: q._id
        });

        return {
          ...q._doc,
          answers
        };

      })
    );

    res.json(questionsWithAnswers);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

};
exports.getQuestionById = async (req, res) => {

  try {

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);

  } catch (error) {

    res.status(500).json(error);

  }

};