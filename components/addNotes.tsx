"use client";
import { FiImage, FiMic } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaPause } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import Image from "next/image";
import sound from "@/public/sound.gif";
import { Toaster, toast } from "react-hot-toast";
import { useFetchAudio } from "@/hooks/fetchAudio";
import { useImageUpload } from "@/hooks/uploadImg";
import moment from 'moment';

interface Props {
    refreshData: () => void;
}

export default function AddNotes({ refreshData }: Props) {
    const [record, setRecord] = useState(false);
    const [time, setTime] = useState(0);
    const [content, setContent] = useState("");
    const [number, setNumber] = useState(0);
    const [norder, setNorder] = useState(10);
    const {
        imageFile,
        imageUrl,
        isUploading,
        handleImageChange,
        uploadImage,
        resetImage
    } = useImageUpload();     //------ custom hook for image upload cloudinary----------------

    const transcribedText = useFetchAudio(record ? "start" : ""); // --- custom Hooke for audio ---------------

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        // _________________________ condition only 60s audio can record ________________________
        if (record) {
            toast("60 second message allowed", { icon: "😅" });
            intervalId = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime >= 59) {
                        setRecord(false);
                        return 0;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
            if (!record) setTime(0);
        };
    }, [record]);

    useEffect(() => {
        if (!record && transcribedText) {
            setContent(transcribedText);
        }
    }, [record, transcribedText]);

    // ______________________-> setting img -> saving img -> getting  img url -> Posting _________________
    const sendData = async () => {
        let uploadedImageUrl = imageUrl;
        try {

            if (imageFile) {
                const newImageUrl = await uploadImage();
                if (newImageUrl === null) {
                    toast.error("Image upload failed. Note not sent.");
                    return;
                }
                uploadedImageUrl = newImageUrl;
            }

            // _____________POSTING DATA ______________
            if (content.length > 0 || uploadedImageUrl) {
                const noteCount = "Note" + number;
                const currentDate = moment().format('YYYY-MM-DD');
                const currentTime = moment().format('HH:mm:ss');
                setNorder((e) => e + 10)
                const order = norder;

                const response = await fetch("/api", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        noteCount,
                        content,
                        imageUrl: uploadedImageUrl,
                        date: currentDate || "error",
                        time: currentTime || "error",
                        order: order
                    }),
                });

                if (response.ok) {
                    setNumber((num) => num + 1);
                    setContent("");
                    refreshData();
                    toast.success("Note added successfully!");
                    resetImage();
                } else {
                    toast.error("Failed to add note.");
                }
            } else {
                toast.error("Please add content or image", { duration: 800 });
            }
        } catch (err) {
            toast.error("Failed to add note");
            console.log(err)
        }
    };

    return (
        <div className="flex justify-center items-center w-full p-4 bg-white ">
            <Toaster position="top-right" reverseOrder={true} />
            <div className="relative w-full flex">
                <div className="relative w-full">
                    <input
                        value={content}
                        type="text"
                        placeholder="Add new note..."
                        className="w-full pl-14 pr-24 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-colors duration-200"
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400  w-10 overflow-hidden">
                        <label htmlFor="image-upload" className="cursor-pointer">
                            <div className={` ${imageFile ? 'text-[#581c87cf]' : ''} flex items-center justify-center`}>
                                <FiImage className="w-6 h-6" />
                            </div>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                                className="hidden "
                            />
                        </label>
                    </div>
                    <button
                        className={`${!record ? 'w-10' : 'w-40'} h-10 absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 rounded-full hover:bg-red-600 transition-all duration-200 flex items-center justify-center`}
                        onClick={() => setRecord(!record)}
                        disabled={isUploading}
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
                <button
                    className="w-14 flex items-center justify-center cursor-pointer hover:bg-zinc-100 active:text-gray-600 rounded-xl"
                    onClick={sendData}
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <MdSend className="w-6 h-6" />
                    )}
                </button>
            </div>
        </div>
    );
}