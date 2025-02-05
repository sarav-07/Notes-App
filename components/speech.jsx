'use client';  // This tells Next.js to run this code only in the browser (not on the server)
import { useState, useEffect } from 'react'; // These are React tools for managing state and side effects

export default function SpeechToText () {
  // These are like memory slots to remember information
  const [isListening, setIsListening] = useState(false); // Remember if we're recording
  const [finalTranscript, setFinalTranscript] = useState(''); // Store finished text
  const [interimTranscript, setInterimTranscript] = useState(''); // Store temporary text
  const [status, setStatus] = useState('idle'); // Remember current status
  const [recognition, setRecognition] = useState(null); // Store the speech recognition object

  // This runs when component loads (like when page first opens)
  useEffect(() => {
    if (typeof window !== 'undefined') { // Check if we're in the browser
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) { // If browser supports speech recognition
        const recognizer = new SpeechRecognition(); // Create speech recognizer
        
        // Set up how it works:
        recognizer.continuous = true; // Keep listening even if you pause
        recognizer.interimResults = true; // Show live results
        recognizer.lang = 'en-US'; // Set language to English

        // What to do when we get results:
        recognizer.onresult = (event) => {
          let interim = '';
          let final = '';
          
          // Go through all speech results
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript; // Get the text
            
            if (event.results[i].isFinal) { // If sentence is complete
              final += transcript + ' '; // Add to final text
            } else { // If still speaking
              interim += transcript; // Add to temporary text
            }
          }
          
          setInterimTranscript(interim); // Update temporary text display
          if (final) {
            setFinalTranscript(prev => prev + final); // Add final text to existing text
          }
        };

        // Handle errors:
        recognizer.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setStatus(`Error: ${event.error}`); // Show error message
          setIsListening(false); // Stop listening
        };

        // Restart listening if it accidentally stops:
        recognizer.onend = () => {
          if (isListening) { // If we should still be listening
            recognizer.start(); // Start again
          }
        };

        setRecognition(recognizer); // Save the recognizer in memory
      }
    }
  }, []); // Empty array = run only once on load

  // Toggle start/stop button
  const toggleListening = () => {
    if (isListening) { // If currently listening
      recognition?.stop(); // Stop listening
      setStatus('Stopped');
    } else { // If not listening
      recognition?.start(); // Start listening
      setStatus('Listening...');
    }
    setIsListening(!isListening); // Flip the listening state
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-red-500">
      {/* Button that changes color when active */}
      <button
        onClick={toggleListening}
        className={`px-4 py-2 rounded-lg ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600' // Red when active
            : 'bg-blue-500 hover:bg-blue-600' // Blue when inactive
        } text-white transition-colors`}
      >
        {isListening ? 'Stop' : 'Start'} Recording
      </button>
      
      {/* Display area */}
      <div className="mt-4 space-y-4">
        <p className="text-gray-600">Status: {status}</p> {/* Current status */}
        
        {/* Live transcription box */}
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="font-semibold mb-2">Live Transcription:</h3>
          <p className="text-gray-700 min-h-[40px]">{interimTranscript}</p>
        </div>

        {/* Final text box */}
        <div className="bg-green-50 p-3 rounded">
          <h3 className="font-semibold mb-2">Final Transcript:</h3>
          <p className="text-gray-700 min-h-[80px]">{finalTranscript}</p>
        </div>
      </div>
    </div>
  );
};