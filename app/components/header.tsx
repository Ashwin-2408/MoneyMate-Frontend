"use client";
import React from "react";
import * as motion from "framer-motion/client";
import decodeJWT from "../Utilities/decodeJWT";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Decode JWT to get userId
      const decoded = decodeJWT(token);

      console.log("Decoded JWT:", decoded); // Add this line to log the decoded JWT

      if (decoded && decoded.userID) {
        setUserId(decoded.userID); // Set the userId in the state
      } else {
        console.log("User ID not found in token.");
        // Handle case where userId is not in the token
        setUserId(null);
      }
    } else {
      // If no token is found, redirect to login page
      window.location.href = "/login";
    }
  }, []);

  return (
    <motion.header
      className="text-white shadow-lg sticky w-full top-0 left-0 z-50 bg-black"
      animate={{ y: 0 }}
      initial={{ y: -250 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex justify-between items-center py-6 px-6">
        {/* Logo Section */}
        <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text">
          MoneyMate
        </div>

        {/* Animated Welcome User Text */}
        <motion.div
          className="text-lg font-semibold text-center"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          {`Welcome ${userId}`}
        </motion.div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 gap-10 mr-10">
          <a
            href="/dashboard"
            className="hover:text-yellow-500 transition duration-200 ease-in-out"
          >
            Dashboard
          </a>
          <a
            href="/transactions"
            className="hover:text-yellow-500 transition duration-200 ease-in-out"
          >
            Transactions
          </a>
          <a
            href="/categories"
            className="hover:text-yellow-500 transition duration-200 ease-in-out"
          >
            Categories
          </a>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
