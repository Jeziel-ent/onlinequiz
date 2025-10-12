import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Check if logged in
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      {/* Brand / Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        QuizMaster
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-4 items-center">
        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 font-semibold px-3 py-1 rounded-md hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
