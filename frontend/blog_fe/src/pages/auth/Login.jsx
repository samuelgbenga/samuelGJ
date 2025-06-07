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
    <div className="min-h-screen bg-[#151515] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#1c1c1c] p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Welcome back
          </h2>
          {/* <p className="mt-2 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to={PATHS.AUTH.REGISTER}
              className="font-medium text-blue-500 hover:text-blue-400"
            >
              Sign up
            </Link>
          </p> */}
        </div>
        {/* Show loading state */}
        {isLoading && (
          <div className="text-center text-blue-500">Signing in...</div>
        )}

        {/* Show error state */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Show success state */}
        {data && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded-md text-sm">
            Login successful! Redirecting...
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="usernameOrEmail" className="sr-only">
                Username or Email
              </label>
              <input
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                required
                value={formData.usernameOrEmail}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-[#2a2a2a] placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Username or Email"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-[#2a2a2a] placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-700 rounded bg-[#2a2a2a]"
                disabled={isLoading}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-400"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-500 hover:text-blue-400"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
