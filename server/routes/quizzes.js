const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

/**
 * @route   GET /api/quizzes
 * @desc    Get all quizzes
 */
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    console.error('Error fetching quizzes:', err.message);
    res.status(500).json({ msg: 'Server error while fetching quizzes' });
  }
});

/**
 * @route   GET /api/quizzes/:id
 * @desc    Get a single quiz by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (err) {
    console.error('Error fetching quiz by ID:', err.message);
    res.status(500).json({ msg: 'Server error while fetching quiz' });
  }
});

/**
 * @route   POST /api/quizzes
 * @desc    Create a new quiz (with validation)
 */
router.post('/', async (req, res) => {
  try {
    const { title, description, category, questions } = req.body;

    // ✅ Validation checks
    if (!title || !description || !category) {
      return res.status(400).json({ msg: 'Title, description, and category are required' });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ msg: 'At least one question is required' });
    }

    // ✅ Check question structure
    for (const q of questions) {
      if (
        !q.text ||
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        typeof q.correctIndex !== 'number'
      ) {
        return res.status(400).json({
          msg: 'Each question must include text, at least 2 options, and a valid correctIndex',
        });
      }
    }

    // ✅ Create quiz if all validations pass
    const quiz = await Quiz.create({ title, description, category, questions });
    res.status(201).json(quiz);
  } catch (err) {
    console.error('Error creating quiz:', err.message);
    res.status(500).json({ msg: 'Server error while creating quiz' });
  }
});

/**
 * @route   POST /api/quizzes/submit
 * @desc    Submit quiz answers and calculate score
 */
router.post('/submit', async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctIndex) score++;
    });

    res.status(200).json({
      msg: 'Quiz submitted successfully',
      totalQuestions: quiz.questions.length,
      correctAnswers: score,
      scorePercentage: ((score / quiz.questions.length) * 100).toFixed(2),
    });
  } catch (err) {
    console.error('Error submitting quiz:', err.message);
    res.status(500).json({ msg: 'Server error while submitting quiz' });
  }
});

module.exports = router;
