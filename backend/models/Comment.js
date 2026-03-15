const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({

  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
    required: true
  },

  comment: {
    type: String,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);