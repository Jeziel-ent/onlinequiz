import { Link } from "react-router-dom";

export default function QuizCard({ quiz }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all">
      <h2 className="text-xl font-bold text-blue-700 mb-2">{quiz.title}</h2>
      <p className="text-gray-600 mb-3">{quiz.description}</p>
      <span className="text-sm text-gray-400">Category: {quiz.category}</span>
      <div className="mt-4">
        <Link
          to={`/quiz/${quiz._id}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
