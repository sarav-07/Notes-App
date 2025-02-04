"use client"
import { HiOutlineSearch } from 'react-icons/hi';
import { TbSortAscending2 } from "react-icons/tb";
import CardDashboard from './dashboard';
import { useState } from 'react';

export default function SearchInput() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const FetchData = async () => {
    try {
      const response = await fetch(`/api?query=${input}`, {
      // const response = await fetch(`/api?query=note0`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return (
    <>
      <div className="flex items-center gap-2 w-full">
        {/* Search Input Container */}
        <div className="relative flex-1 h-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-zinc-00 focus:ring-1 focus:ring-zinc-border-zinc-00 transition-colors duration-200"
            onChange={(e) => setInput(e.target.value)}
          />
          <HiOutlineSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Search Button */}
        <button className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-500 hover:border-zinc-200 transition-colors duration-200"
          onClick={FetchData}>
          <HiOutlineSearch className="h-5 w-5" />
        </button>

        {/* Sort Button */}
        <button className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-500 hover:border-zinc-200 transition-colors duration-200">
          <TbSortAscending2 className="h-5 w-5" />
        </button>
      </div>
      <CardDashboard />
    </>

  );
}