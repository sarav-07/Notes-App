"use client"
import { FiCopy } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegImage, FaRegFileAudio } from "react-icons/fa";
import custom from "./custom.module.css"
import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import ph from "@/public/ph.jpg"

interface Prop {
  _id: string;
  title: string;
  body: string;
  img?: string;
}

interface NoteCardProps {
  Mynotes: Prop;
  refreshData: () => void;
}

export default function NoteCard({ Mynotes, refreshData }: NoteCardProps) {
  const [copyied, setCopied] = useState(false);
  // _______________________for coping text_______________________________
  const copy = async () => {
    await navigator.clipboard.writeText(Mynotes.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000)
  }
  // ______________________Making delete request of note ______________________
  const deleteItem = async () => {
    try {
      const response = await fetch(`/api?query=${Mynotes._id}`, {
        method: "DELETE"
      })
      if (response.ok) {
        toast.success("Note deleted succesfully")
        refreshData()
      } else { throw new Error("Error -deleting item") }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  return (
    <div className="w-full max-w-96 p-4 rounded-xl border border-gray-200 bg-white h-96 min-w-96 flex flex-col">
      <Toaster
        position="top-right"
        reverseOrder={true}
      />
      {/* Date & Time */}
      <div className="text-xs text-gray-400 mb-2">
        September 15, 2023 | 10:30 AM
      </div>

      {/* Note Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {Mynotes.title}
      </h3>

      {/* Notes Content */}
      <p className={`text-gray-600 text-sm mb-4 flex-1 overflow-y-auto ${custom.scrollbar}`}>
        {Mynotes.body}
        <Image src={Mynotes.img || ph} alt="image" width={90} height={50}/>
        {/* {Mynotes.img} */}
      </p>
      {/* Bottom Section */}
      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
        {/* Left Side Icons */}
        <div className="flex items-center gap-3 text-gray-400">
          <FaRegImage className="w-5 h-5" />
          <FaRegFileAudio className="w-5 h-5" />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 text-gray-400">
          {copyied || <FiCopy className="w-5 h-5 cursor-pointer" onClick={copy} />}
          {!copyied || <FaCheckSquare className="w-5 h-5 " />}
          <RiDeleteBin5Line className="w-5 h-5 cursor-pointer" onClick={deleteItem} />
        </div>
      </div>
    </div>
  );
}