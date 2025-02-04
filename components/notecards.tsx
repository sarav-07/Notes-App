import { FiCopy } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegImage, FaRegFileAudio } from "react-icons/fa";
import custom from "./custom.module.css"

export default function NoteCard() {
  return (
    <div className="w-full max-w-96 p-4 rounded-xl border border-gray-200 bg-white h-96 min-w-96 flex flex-col">
      {/* Date & Time */}
      <div className="text-xs text-gray-400 mb-2">
        September 15, 2023 | 10:30 AM
      </div>

      {/* Note Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Meeting Notes - Client Discussion
      </h3>

      {/* Notes Content */}
      <p className={`text-gray-600 text-sm mb-4 flex-1 overflow-y-auto ${custom.scrollbar}`}>
        Discussed project requirements and timeline for the upcoming phase.
        Discussed project requirements and timeline for the upcoming phase.
        Client requested additional features for the dashboard interface.
        Discussed project requirements and timeline for the upcoming phase.
        Client requested additional features for the dashboard interface.
        Discussed project requirements and timeline for the upcoming phase.
        Client requested additional features for the dashboard interface.
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
          <FiCopy className="w-5 h-5 cursor-pointer" />
          <HiDotsVertical className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}