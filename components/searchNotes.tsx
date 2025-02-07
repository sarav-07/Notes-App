"use client"
import { HiOutlineSearch } from 'react-icons/hi';
import { TbSortAscending2 } from "react-icons/tb";
import CardDashboard from './dashboard';
import { useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";


export default function SearchInput() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const FetchData = async () => {
    try {
      const response = await fetch(`/api?query=${input}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const notes = await response.json();
      console.log("Fetched data:", notes);

      if (notes.Allnotes && Array.isArray(notes.Allnotes) && notes.Allnotes.length > 0) {
        setData(notes.Allnotes);
      } else {
        toast.error("Record not found .",{
          duration:1000
        })
        setData([]);
      }
    } catch (error) {
      toast.error("Something went wrong.  .",{
        duration:900
      })
    }
  };
  useEffect(() => {
    if(input.length==0){
      FetchData();
    }
  }, [input])
  
  return (
    <div className='w-full h-[95vh] p-3'>
      <div className="flex items-center gap-2 w-full bg-white mb-1 ">
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        {/* Search Input Container */}
        <div className="relative flex-1 h-full ">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border shadow-md border-gray-200 focus:outline-none focus:border-zinc-200 focus:ring-1 focus:ring-zinc-200 transition-colors duration-200"
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
      <CardDashboard AllData={data} refreshData={FetchData} />
    </div>

  );
}