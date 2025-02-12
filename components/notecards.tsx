"use client"
import { FiCopy } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import custom from "./custom.module.css"
import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import ph from "@/public/noimg.jpg"
import Modal from "./modal";
import { FiEye } from 'react-icons/fi';

interface Prop {
  _id: string;
  title: string;
  body: string;
  date: string,
  time: string,
  order: number
  img?: string;
}

interface NoteCardProps {
  Mynotes: Prop;
  refreshData: () => void;
}

export default function NoteCard({ Mynotes, refreshData }: NoteCardProps) {
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);
  // _______________________for coping text_______________________________
  const copy = async () => {
    await navigator.clipboard.writeText(Mynotes.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000)
  }
  // ______________________Making delete request of note ______________________
  const deleteItem = async () => {
    try {
      // Delete image using fetch
      setDeleting(true);
      if (Mynotes.img) {
        await fetch('/api/upload', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },  
          body: JSON.stringify({
            img: Mynotes.img
          }),
        });
      }
      const response = await fetch(`/api?query=${Mynotes._id}`, {
        method: "DELETE"
      })
      if (response.ok) {
        toast.success("Note deleted succesfully")
        setDeleting(false)
        refreshData()
      } else { throw new Error("Error -deleting item") }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  return (
    <div className="w-full max-w-xs md:max-w-sm p-5 rounded-xl border border-gray-100 bg-white h-96 flex flex-col shadow-lg hover:shadow-xl transition-shadow">
      <Toaster position="top-right" reverseOrder={true} />

      {/* -----------------------------Date & Time----------------------------- */}
      <div className="text-xs text-gray-400 mb-2 font-medium">
        {Mynotes.date} || {Mynotes.time}
      </div>

      {/* Note Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
        {Mynotes.title}
      </h3>

      {/* -----------------------------Notes Content----------------------------- */}
      <div className={`text-gray-600 text-sm mb-4 flex-1 overflow-y-auto ${custom.scrollbar}`}>
        <p className="mb-3 break-words">
          {Mynotes.body}
        </p>
        <Image
          src={Mynotes.img || ph}
          alt="Note image"
          width={120}
          height={80}
          className="rounded-lg object-cover border border-gray-100"
        />
      </div>

      {/* -----------------------------Bottom Section----------------------------- */}
      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
        {/* View Button */}
        <button
          onClick={() => setShow(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          <FiEye className="w-4 h-4" />
          View
        </button>

        {/* -----------------------------Right Side Actions(Bin)----------------------------- */}
        <div className="flex items-center gap-3 text-gray-400">
          {copied || <FiCopy className="w-4 h-4 cursor-pointer hover:text-gray-600" onClick={copy} />}
          {copied && <FaCheckSquare className="w-4 h-4 text-green-500" />}

          {deleting ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <RiDeleteBin5Line
              className="w-4 h-4 cursor-pointer hover:text-red-500"
              onClick={deleteItem}
            />
          )}
        </div>
      </div>

      {/* -----------------------------Modal Overlay----------------------------- */}
      {show && (
        <div
          className="bg-[#25252517] fixed inset-0 backdrop-blur-sm flex items-center justify-center z-20 p-2 md:p-4"
          onClick={(e) => e.target === e.currentTarget && setShow(false)}
        >
          <Modal noteData={Mynotes} refreshData={refreshData} />
        </div>
      )}
    </div>
  );
}