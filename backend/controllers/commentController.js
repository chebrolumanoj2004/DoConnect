const Comment = require("../models/Comment");


exports.addComment = async (req, res) => {

  try {

    const { answerId, comment } = req.body;

    const newComment = new Comment({
      answerId,
      comment
    });

    await newComment.save();

    res.status(201).json({
      message: "Comment added successfully",
      newComment
    });

  } catch (error) {
    res.status(500).json(error);
  }

};



exports.getComments = async (req, res) => {

  try {

    const comments = await Comment.find({
      answerId: req.params.answerId
    });

    res.json(comments);

  } catch (error) {
    res.status(500).json(error);
  }

};