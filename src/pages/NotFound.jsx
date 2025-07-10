// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-orange-50 text-center p-4">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">Oops! Page not found.</p>
      <Link to="/dashboard" className="text-white bg-orange-500 px-4 py-2 rounded hover:bg-orange-600">
        Go to Dashboard
      </Link>
    </div>
  );
}
