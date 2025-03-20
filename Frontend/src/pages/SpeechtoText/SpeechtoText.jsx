// import React, { useState, useEffect } from "react";
// import { Mic, StopCircle, FileText, Copy, RotateCcw } from "lucide-react";

// const SpeechToText = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [text, setText] = useState("");
//   const [copied, setCopied] = useState(false);
//   const [animateMic, setAnimateMic] = useState(false);

//   useEffect(() => {
//     let interval;
//     if (isListening) {
//       setAnimateMic(true);
//       interval = setInterval(() => {
//         setAnimateMic((prev) => !prev);
//       }, 500);
//     } else {
//       setAnimateMic(false);
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [isListening]);

//   const handleListen = () => {
//     setIsListening(true);

//     setTimeout(() => {
//       setText(
//         (prev) =>
//           prev +
//           (prev ? " " : "") +
//           "This is a sample transcribed text. The speech recognition would actually capture your voice and convert it to text in real-time."
//       );
//       setIsListening(false);
//     }, 3000);
//   };

//   const handleStop = () => {
//     setIsListening(false);
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleReset = () => {
//     setText("");
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
//       <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="bg-[#441752] p-6 text-white">
//           <h1 className="text-2xl font-bold mb-2 flex items-center">
//             <FileText className="mr-2" />
//             Speech to Text Converter
//           </h1>
//           <p className="opacity-80">
//             Speak clearly and watch your words appear
//           </p>
//         </div>

//         <div className="p-6">
//           <div className="mb-6">
//             <div className="p-4 bg-gray-50 rounded-lg min-h-32 border border-gray-200">
//               {text ? (
//                 <p className="whitespace-pre-wrap">{text}</p>
//               ) : (
//                 <p className="text-gray-400">
//                   Your transcribed text will appear here...
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-4 justify-between items-center">
//             <div className="flex-1">
//               <div className="flex flex-wrap gap-3">
//                 <button
//                   onClick={handleListen}
//                   disabled={isListening}
//                   className={`flex items-center justify-center p-3 rounded-full ${
//                     isListening
//                       ? "bg-gray-200 cursor-not-allowed"
//                       : "bg-[#441752] hover:bg-[#5a1e6d] text-white transform hover:scale-105 transition-all"
//                   }`}
//                 >
//                   <Mic
//                     className={`${
//                       animateMic ? "scale-125" : "scale-100"
//                     } transition-transform duration-300`}
//                   />
//                 </button>

//                 <button
//                   onClick={handleStop}
//                   disabled={!isListening}
//                   className={`flex items-center justify-center p-3 rounded-full ${
//                     !isListening
//                       ? "bg-gray-200 cursor-not-allowed"
//                       : "bg-red-500 hover:bg-red-600 text-white transform hover:scale-105 transition-all"
//                   }`}
//                 >
//                   <StopCircle />
//                 </button>

//                 <button
//                   onClick={handleReset}
//                   disabled={!text}
//                   className={`flex items-center justify-center p-3 rounded-full ${
//                     !text
//                       ? "bg-gray-200 cursor-not-allowed"
//                       : "bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105 transition-all"
//                   }`}
//                 >
//                   <RotateCcw />
//                 </button>

//                 <button
//                   onClick={handleCopy}
//                   disabled={!text}
//                   className={`flex items-center justify-center p-3 rounded-full ${
//                     !text
//                       ? "bg-gray-200 cursor-not-allowed"
//                       : "bg-green-500 hover:bg-green-600 text-white transform hover:scale-105 transition-all"
//                   }`}
//                 >
//                   <Copy />
//                 </button>
//               </div>
//             </div>

//             <div>
//               {copied && (
//                 <span className="text-green-500 text-sm animate-bounce">
//                   Copied to clipboard!
//                 </span>
//               )}
//               {isListening && (
//                 <span className="text-[#441752] text-sm flex items-center">
//                   <span className="mr-2">Listening</span>
//                   <span className="flex">
//                     <span className="animate-bounce mx-px">.</span>
//                     <span
//                       className="animate-bounce mx-px"
//                       style={{ animationDelay: "0.2s" }}
//                     >
//                       .
//                     </span>
//                     <span
//                       className="animate-bounce mx-px"
//                       style={{ animationDelay: "0.4s" }}
//                     >
//                       .
//                     </span>
//                   </span>
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="p-4 bg-gray-50 border-t text-center text-gray-500 text-sm">
//           <p>Press the microphone button and start speaking</p>
//         </div>
//       </div>

//       <div className="mt-8 w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-xl font-bold mb-4 text-[#441752]">How to Use</h2>
//         <ul className="space-y-2">
//           <li className="flex items-start">
//             <div className="bg-[#441752] text-white rounded-full p-1 mr-3 mt-1">
//               <Mic size={14} />
//             </div>
//             <p>Click the microphone button to start recording your voice.</p>
//           </li>
//           <li className="flex items-start">
//             <div className="bg-red-500 text-white rounded-full p-1 mr-3 mt-1">
//               <StopCircle size={14} />
//             </div>
//             <p>Click the stop button when you've finished speaking.</p>
//           </li>
//           <li className="flex items-start">
//             <div className="bg-blue-500 text-white rounded-full p-1 mr-3 mt-1">
//               <RotateCcw size={14} />
//             </div>
//             <p>Use the reset button to clear all transcribed text.</p>
//           </li>
//           <li className="flex items-start">
//             <div className="bg-green-500 text-white rounded-full p-1 mr-3 mt-1">
//               <Copy size={14} />
//             </div>
//             <p>Copy your transcribed text to the clipboard with one click.</p>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SpeechToText;


import React, { useState, useRef } from "react";
import { Mic, StopCircle, FileText, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  const handleStartListening = () => {
    setIsListening(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      let chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        uploadAudio(audioBlob);
      };
      mediaRecorder.start();
    });
  };

  const handleStopListening = () => {
    setIsListening(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const uploadAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recorded_audio.wav");
    try {
      const response = await fetch("http://127.0.0.1:5000/speech-text", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setText(data.text || "Error processing speech.");
    } catch (error) {
      console.error("Error:", error);
      setText("Failed to fetch response from the server.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex h-screen bg-[#441752]">
      {/* Sidebar */}
      <motion.div
        className="w-64 bg-[#441752] text-white flex flex-col p-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl font-semibold mb-8">Repobot</h1>
        <nav className="space-y-3">
          <Link to="/dashboard/repobot" className="block hover:text-gray-300">Dashboard</Link>
          <Link to="/dashboard/speech-text" className="block hover:text-gray-300">Speech-to-Text</Link>
          <Link to="/dashboard/qna" className="block hover:text-gray-300">Q&A</Link>
          <Link to="/dashboard/files" className="block hover:text-gray-300">Files Summarization</Link>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center flex-grow min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#441752] p-6 text-white">
            <h1 className="text-2xl font-bold mb-2 flex items-center">
              <FileText className="mr-2" /> Speech to Text Converter
            </h1>
            <p className="opacity-80">Speak clearly and watch your words appear</p>
          </div>

          <div className="p-6">
            <div className="mb-6 p-4 bg-gray-50 rounded-lg min-h-32 border border-gray-200">
              <p className={text ? "whitespace-pre-wrap" : "text-gray-400"}>
                {text || "Your transcribed text will appear here..."}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-between items-center">
              <button
                onClick={handleStartListening}
                disabled={isListening}
                className={`p-3 rounded-full ${isListening ? "bg-gray-200" : "bg-[#441752] hover:bg-[#5a1e6d] text-white"}`}
              >
                <Mic />
              </button>

              <button
                onClick={handleStopListening}
                disabled={!isListening}
                className={`p-3 rounded-full ${!isListening ? "bg-gray-200" : "bg-red-500 hover:bg-red-600 text-white"}`}
              >
                <StopCircle />
              </button>

              <button
                onClick={handleCopy}
                disabled={!text}
                className={`p-3 rounded-full ${!text ? "bg-gray-200" : "bg-green-500 hover:bg-green-600 text-white"}`}
              >
                <Copy />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;