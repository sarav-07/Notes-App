"use client";
import React, { useState, useEffect } from 'react';
import { FaHome, FaHeart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { FiLogOut, FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';
import { getCookie, deleteCookie } from "cookies-next";

const AsidePanel = () => {
  const [payload, setPayload] = useState<{ email?: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAsideVisible, setIsAsideVisible] = useState(false);

// ______________ Getting user from cookie_____________________
  useEffect(() => {
    const payloadCookie = getCookie("payload") as string;
    if (payloadCookie) {
      try {
        const parsedPayload = JSON.parse(payloadCookie);
        setPayload(parsedPayload);
      } catch (error) {
        console.error("Failed to parse payload cookie:", error);
      }
    }
  }, []);

// ______________ Handling logout clearing token __________________
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        window.location.href = "/register";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      {/* -----------------------Mobile Menu Toggle----------------------- */}
      {!isAsideVisible && (
        <button
          className="lg:hidden fixed top-4 left-4 z-40 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          onClick={() => setIsAsideVisible(true)}
        >
          <FaBars className="text-xl text-blue-600" />
        </button>
      )}

      {/* -----------------------Aside Container----------------------- */}
      <aside
        className={`z-10 shadow-sm w-80 lg:w-[24%] bg-white text-gray-800 h-screen m-0 lg:h-[92vh] flex flex-col border-r border-gray-100 fixed lg:static inset-y-0 left-0 
          transform 
          ${isAsideVisible
            ? 'translate-x-0 '
            : '-translate-x-full lg:translate-x-0'
          } transition-transform duration-300 ease-in-out lg:rounded-2xl lg:m-4`}
      >
        {/* -----------------------Header Section with Close Button----------------------- */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            AI Notes
            <span className="text-blue-400 ml-1">Pro</span>
          </h1>
          <button
            className="lg:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setIsAsideVisible(false)}
          >
            <FaTimes className="text-xl text-blue-600" />
          </button>
        </div>

        {/* -----------------------Navigation Menu----------------------- */}
        <nav className="flex-grow p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="flex items-center p-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                onClick={() => setIsAsideVisible(false)}
              >
                <FaHome className="w-5 h-5 mr-3 text-blue-500 group-hover:text-blue-600" />
                <span className="font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                onClick={() => setIsAsideVisible(false)}
              >
                <FaHeart className="w-5 h-5 mr-3 text-blue-500 group-hover:text-blue-600" />
                <span className="font-medium">Favorites</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* -----------------------User Profile Section----------------------- */}
        <div className="border-t border-gray-100 mt-auto">
          <div className={`overflow-hidden transition-all duration-300 ${isDropdownOpen ? 'max-h-40' : 'max-h-20'}`}>
            {/* Profile Header */}
            <div
              className="p-4 flex items-center cursor-pointer hover:bg-blue-50 transition-colors duration-200 group"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle className="w-8 h-8 mr-3 text-blue-500" />
              <div className="flex-1 min-w-0 ">
                <p className="font-medium text-gray-700 truncate">{payload?.email}</p>
                <p className="text-sm text-blue-500">User Account</p>
              </div>
              <FiChevronDown
                className={`transform transition-transform text-blue-400 ${isDropdownOpen ? 'rotate-180' : ''
                  }`}
              />
            </div>

            {/* -----------------------Dropdown Content----------------------- */}
            <div
              className={`mt-3 px-4 pb-4 transition-opacity duration-300 ${isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-blue-100 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
              >
                <span className="flex items-center font-medium">
                  <FiLogOut className="w-4 h-4 mr-2" />
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AsidePanel;