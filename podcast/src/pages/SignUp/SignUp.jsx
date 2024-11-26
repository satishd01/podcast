import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-[#1F1F1F] p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-200 text-center mb-6">
          Sign Up
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded bg-[#151515] text-gray-200 outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-400 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded bg-[#151515] text-gray-200 outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-400 text-sm mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 rounded bg-[#151515] text-gray-200 outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gray-200 text-black font-semibold rounded hover:bg-gray-300">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          {`Already have an account? `}
          <Link to="/login" className="text-gray-200 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
