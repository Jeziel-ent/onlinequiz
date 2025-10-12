const mongoose = require("mongoose");

// 🧩 Define Question Schema (for each question)
const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // array of strings
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 2; // must have at least 2 options
      },
      message: "Each question must have at least 2 options.",
    },
  },
  correctIndex: {
    type: Number,
    required: true,
  },
});

// 🧱 Define Quiz Schema (main structure)
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
});

// ✅ Export model
module.exports = mongoose.model("Quiz", quizSchema);
