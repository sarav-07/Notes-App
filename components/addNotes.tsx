"use client";
import { FiImage, FiMic } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaPause } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import Image from "next/image";
import sound from "@/public/sound.gif";
import { Toaster, toast } from "react-hot-toast";

export default function AddNotes() {
    const [record, setRecord] = useState(false);
    const [time, setTime] = useState(0);
    const [content, setContent] = useState("")
    const [number, setNumber] = useState(0);
    useEffect(() => {
        if (record) {
            const timer = setTimeout(() => {
                setTime((prevTime) => {
                    if (prevTime >= 60) {
                        setRecord(false);
                        return 0;
                    }
                    return prevTime + 1;
                });
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setTime(0);
        }
    }, [record, time]);
    // useEffect(() => {
    //     console.log(content)
    // }, [content])
    const sendData = async () => {
        const noteCount = "Note" + number;
        try {
            if (content.length > 0) {
                fetch("/api", {
                    method: 'POST',
                    body: JSON.stringify({ noteCount, content })
                })
                setNumber(num => num + 1);
                setContent("");
            } else {
                toast.error("No Content found . Please Add note", { duration: 800 })
            }
        } catch (err) {
            console.error("Something went wrong")
        }

    }

    return (
        <div className="flex justify-center items-center w-full p-4 bg-white ">
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
            <div className="relative w-full  flex">
                <div className="relative w-full">
                    <input
                        value={content}
                        type="text"
                        placeholder="Add new note..."
                        className="w-full pl-10 pr-24 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-colors duration-200"
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <label htmlFor="image-upload" className="cursor-pointer">
                            <FiImage className="w-5 h-5" />
                            <input type="file" id="image-upload" accept="image/*" className="hidden" />
                        </label>
                    </div>

                    <button
                        className={`${!record ? 'w-10' : 'w-40'} h-10 absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 rounded-full hover:bg-red-600 transition-all duration-200 flex items-center justify-center`}
                        onClick={() => setRecord(!record)}
                    >
                        {record || <FiMic className="w-5 h-5 text-white" />}
                        {record && (
                            <span className="flex text-white items-center gap-3 h-full">
                                <p>0:{time.toString().padStart(2, '0')}</p>
                                <Image src={sound} alt="wave" className="invert" height={20} />
                                <FaPause className="w-4 h-4 text-white" />
                            </span>
                        )}
                    </button>
                </div>
                <button className="w-14 flex items-center justify-center cursor-pointer hover:bg-zinc-100 active:text-gray-600  "
                    onClick={sendData}>
                    <MdSend className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
