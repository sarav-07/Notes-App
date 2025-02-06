"use client"
import { useState, useEffect } from "react";

export function useFetchAudio(state: string) {
    const [text, setText] = useState("");

    useEffect(() => {
        if (state === "start") {
            if (typeof window !== 'undefined') {
                const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                if (SpeechRecognition) {
                    const recognition = new SpeechRecognition();
                    recognition.lang = "en-US";
                    recognition.onresult = (event: any) => {
                        const transcript = event.results[0][0].transcript;
                        setText(transcript);
                    };

                    recognition.start();
                } else {
                    console.warn("Speech recognition not available");
                }
            }
        }
    }, [state]);

    return text;
}