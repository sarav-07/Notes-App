"use client"
import React from 'react';
import { FaHome, FaHeart, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
// import { useRouter } from 'next/router';

const AsidePanel = () => {
//   const router = useRouter(); // Get the current route

  return (
    <aside className="w-[28rem]  bg-gray-50 text-gray-800 h-[95vh] flex flex-col rounded-2xl border-[1px] border-gray-200">
      {/* Heading */}
      <div className="p-6 text-2xl font-bold border-b border-gray-200">
        AI Notes
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4">
        <ul>
          <li className="mb-4 rounded-xl text-lg text-purple-900  hover:bg-purple-200">
            <Link
              href="#"
              className={`flex items-center p-2 rounded-xl pl-7 transition-colors w-full`}
            //     ${
            //     router.pathname === '/home'
            //       ? 'border border-purple-500 bg-gray-100 text-purple-500'
            //       : 'hover:bg-gray-100'
            //   }`}
            >
              <FaHome className="mr-3" />
              Home
            </Link>
          </li>
          <li className="mb-4 rounded-xl text-lg text-purple-900  hover:bg-purple-200">
            <Link
              href="#"
              className={`flex items-center p-2 rounded-xl pl-7 transition-colors `}
            //     ${
            //     router.pathname === '/favorites'
            //       ? 'border border-purple-500 bg-gray-100 text-purple-500'
            //       : 'hover:bg-gray-100'
            //   }`}
            >
              <FaHeart className="mr-3" />
              Favorites
            </Link>
          </li>
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <FaUserCircle className="text-3xl mr-3 text-gray-600" />
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AsidePanel;