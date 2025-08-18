// ErrorPage.jsx

import { useNavigate } from "react-router-dom";
import { FaRocket } from "react-icons/fa6";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Background floating circles */}
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full opacity-20 animate-ping top-[-10%] left-[-10%]"></div>
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full opacity-20 animate-ping top-[60%] left-[70%]"></div>

      <div className="text-center z-10">
        <h1 className="text-9xl font-extrabold text-white animate-bounce">
          404
        </h1>
        <h2 className="text-3xl md:text-5xl font-semibold text-white mt-4">
          Page Not Found
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mt-2 mb-8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary btn-lg flex items-center gap-2 animate-bounce hover:scale-110 transition-transform"
        >
          <FaRocket /> Go Back Home
        </button>
      </div>

      {/* Small twinkling stars */}
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className={`absolute bg-white rounded-full opacity-70 animate-pulse`}
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        ></span>
      ))}
    </div>
  );
};
export default ErrorPage;
