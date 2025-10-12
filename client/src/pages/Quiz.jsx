import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Quiz() {
  const { id } = useParams(); // quiz id from URL
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  // ✅ Fetch quiz data by ID
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(null));
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  // ✅ Handle answer selection
  const selectAnswer = (optionIndex) => {
    const updated = [...answers];
    updated[current] = optionIndex;
    setAnswers(updated);
  };

  // ✅ Navigate between questions
  const nextQuestion = () => {
    if (current < quiz.questions.length - 1) setCurrent(current + 1);
  };
  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  // ✅ Submit quiz
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/quizzes/submit", {
        quizId: quiz._id,
        answers,
      });
      setResult(res.data);
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-600 text-lg font-semibold">
        Loading quiz...
      </div>
    );

  if (!quiz)
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Quiz not found!
      </div>
    );

  // ✅ If quiz is completed → show result
  if (result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-2">✅ Correct Answers: {result.correctAnswers}</p>
          <p className="text-lg mb-2">📊 Total Questions: {result.totalQuestions}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            🎯 Score: {result.scorePercentage}%
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[current];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl">
        <h2 className="text-xl font-bold text-blue-700 mb-2">
          Question {current + 1} of {quiz.questions.length}
        </h2>
        <p className="text-gray-700 text-lg mb-6">{question.text}</p>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectAnswer(index)}
              className={`w-full p-3 text-left rounded-md border transition 
                ${
                  answers[current] === index
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            disabled={current === 0}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>

          {current === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
