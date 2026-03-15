const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    default: "open"
  },

  approved: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Question", QuestionSchema);