const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({

  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },

  answer: {
    type: String,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  likes: {
    type: Number,
    default: 0
  },

  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  approved: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Answer", AnswerSchema);