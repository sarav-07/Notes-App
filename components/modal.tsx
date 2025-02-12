import { useState, useEffect } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import p from "@/public/noimg.jpg"

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
  noteData: Prop;
  refreshData: () => void;
}
const NoteModal = ({ noteData , refreshData }: NoteCardProps) => {
  const [editedTitle, setEditedTitle] = useState(noteData.title);
  const [editedBody, setEditedBody] = useState(noteData.body);

  useEffect(() => {
    setEditedTitle(noteData.title);
    setEditedBody(noteData.body);
  }, [noteData]);

  const handleSave = async () => {
    if (editedTitle === noteData.title && editedBody === noteData.body) {
      toast.error('No changes to save!');
      return;
    }
  
    try {
      const response = await fetch(`/api?id=${noteData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          body: editedBody
        }),
      });
  
      if (!response.ok) throw new Error('Failed to save changes');
      refreshData();
      toast.success('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save changes');
    }
  };
  
  return (
    <div className="w-[80%] max-w-[1200px] h-[90vh] md:h-[65vh] bg-white rounded-xl shadow-2xl p-4 md:p-6 flex flex-col">
      {/* Creation Date - Removed border */}
      <div className="text-xs md:text-sm text-gray-500 flex flex-col md:flex-row md:items-center gap-1 md:gap-2 pb-2 md:h-10">
        <span>{noteData.date} || {noteData.time}</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1 overflow-hidden mt-4">
        {/* Image Section - Adjusted height */}
        <div className="w-full md:w-2/5 h-[35vh] lg:h-[48vh] relative">
          <Image
            src={noteData.img || p}
            alt="Note cover"
            fill
            className="object-cover rounded-lg"
            // sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        {/* Text Content - Removed borders */}
        <div className="w-full md:w-3/5 flex flex-col overflow-y-auto gap-4 md:gap-6">
          <div className="space-y-2 md:space-y-4">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-xl md:text-2xl font-bold text-gray-800 w-full p-2 focus:outline-none focus:ring-0"
              placeholder="Note Title"
            />
          </div>

          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-wrap w-full flex-1 p-2 resize-none focus:outline-none focus:ring-0 min-h-[200px] md:min-h-0"
            placeholder="Note Content"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="w-full md:w-auto px-4 py-2 md:px-6 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base md:text-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default NoteModal;