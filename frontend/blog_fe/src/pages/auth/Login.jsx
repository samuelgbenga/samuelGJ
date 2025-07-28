import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PATHS } from "../../route/route";
import { useLoginHook } from "../../hooks/useAuth";
import { USER } from "../../utils/constants";

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const navigate = useNavigate();
  //const location = useLocation();
  const { login, error, isLoading, data, isAuthenticated } = useLoginHook();

  // Log when data changes (successful login)
  useEffect(() => {
    if (data) {
      console.log("Login successful, user data:", data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      //      console.log("Login response in component:", response);
      // Navigate immediately after successful login
      navigate(PATHS.ADMIN.DASHBOARD, { replace: true });
    } catch (err) {
      // Error is already handled by the hook
      //     console.log("Login failed in component:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#151515] to-[#1a1a1a] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#1c1c1c]/80 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-sm text-gray-400 mt-2">Sign in to your account</p>
        </div>

        {isLoading && (
          <div className="text-center text-blue-400 animate-pulse">
            Signing in...
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        {data && (
          <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-2 rounded-md text-sm">
            Login successful! Redirecting...
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              required
              value={formData.usernameOrEmail}
              onChange={handleChange}
              placeholder="Username or Email"
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] text-white border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] text-white border border-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-400">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-700 rounded bg-[#2a2a2a]"
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md transition ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
