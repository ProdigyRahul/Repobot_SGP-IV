import React, { useState, useRef, useEffect } from "react";
import { Mic, StopCircle, FileText, Copy, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BackButton from "../../UI/BackButton";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [animateMic, setAnimateMic] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isListening) {
      setAnimateMic(true);
      interval = setInterval(() => {
        setAnimateMic((prev) => !prev);
      }, 500);
    } else {
      setAnimateMic(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isListening]);

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
        uploadAudio(audioBlob);
      };
      mediaRecorder.start();
    });
  };

  const handleStopListening = () => {
    setIsListening(false);
    mediaRecorderRef.current?.stop();
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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => setText("");

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-text-light dark:text-text-dark"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
      <BackButton />
      {/* Fixed BackButton with proper positioning */}
      <div className="fixed top-4 left-20 md:left-72 z-50">
        <BackButton />
      </div>
      {/* Sidebar */}
      <motion.div
        className={`fixed md:relative w-64 h-full bg-primary-light dark:bg-primary-dark text-text-dark flex flex-col p-6 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: sidebarOpen ? 0 : -100, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-xl font-semibold mb-8">Repobot</h1>
        <nav className="space-y-3">
          <Link to="/dashboard/repobot" className="block hover:text-gray-300">
            Dashboard
          </Link>
          <Link
            to="/dashboard/speech-text"
            className="block hover:text-gray-300"
          >
            Speech-to-Text
          </Link>
          <Link to="/dashboard/qna" className="block hover:text-gray-300">
            Q&A
          </Link>
          <Link to="/dashboard/files" className="block hover:text-gray-300">
            Files Summarization
          </Link>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center flex-grow min-h-screen p-6">
        <div className="w-full max-w-3xl bg-background-light dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-primary-light dark:bg-primary-dark p-6 text-white">
            <h1 className="text-2xl font-bold mb-2 flex items-center">
              <FileText className="mr-2" />
              Speech to Text Converter
            </h1>
            <p className="opacity-80">
              Speak clearly and watch your words appear
            </p>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg min-h-32 border border-border-light dark:border-gray-600">
                {text ? (
                  <p className="whitespace-pre-wrap text-text-light dark:text-text-dark">
                    {text}
                  </p>
                ) : (
                  <p className="text-muted-light dark:text-gray-400">
                    Your transcribed text will appear here...
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex-1">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleStartListening}
                    disabled={isListening}
                    className={`p-3 rounded-full ${
                      isListening
                        ? "bg-gray-200 dark:bg-gray-600 cursor-not-allowed"
                        : "bg-primary-light dark:bg-primary-dark hover:opacity-90 text-white"
                    }`}
                  >
                    <Mic
                      className={`${
                        animateMic ? "scale-125" : "scale-100"
                      } transition-transform duration-300`}
                    />
                  </button>

                  <button
                    onClick={handleStopListening}
                    disabled={!isListening}
                    className={`p-3 rounded-full ${
                      !isListening
                        ? "bg-gray-200 dark:bg-gray-600 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    <StopCircle />
                  </button>

                  <button
                    onClick={handleReset}
                    disabled={!text}
                    className={`p-3 rounded-full ${
                      !text
                        ? "bg-gray-200 dark:bg-gray-600 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    <RotateCcw />
                  </button>

                  <button
                    onClick={handleCopy}
                    disabled={!text}
                    className={`p-3 rounded-full ${
                      !text
                        ? "bg-gray-200 dark:bg-gray-600 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    <Copy />
                  </button>
                </div>
              </div>

              <div>
                {copied && (
                  <span className="text-green-500 text-sm animate-bounce">
                    Copied to clipboard!
                  </span>
                )}
                {isListening && (
                  <span className="text-primary-light dark:text-primary-dark text-sm flex items-center">
                    <span className="mr-2">Listening</span>
                    <span className="flex">
                      <span className="animate-bounce mx-px">.</span>
                      <span
                        className="animate-bounce mx-px"
                        style={{ animationDelay: "0.2s" }}
                      >
                        .
                      </span>
                      <span
                        className="animate-bounce mx-px"
                        style={{ animationDelay: "0.4s" }}
                      >
                        .
                      </span>
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-border-light dark:border-gray-600 text-center text-muted-light dark:text-gray-400 text-sm">
            <p>Press the microphone button and start speaking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
