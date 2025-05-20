import { useState, useRef } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

const Sendplane = ({ onSend }) => {
//=============================States===================================
  const [prompt, setPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleSend = () => {
    if (prompt.trim() !== "") {
      onSend({ sender: "User", prompt });
      setPrompt("");
    }
  };
  //============================Handles===================================
  const handleMic = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPrompt((prev) => prev + " " + transcript);
      };

      recognition.onerror = (event) => {
        console.error("Mic Error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    if (!isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="bg-black w-full min-h-[5rem] flex justify-around items-center px-3">
      <textarea
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        className="w-[70%] h-16 px-3 ml-12 py-2 resize-none rounded-md focus:outline-none  text-white bg-zinc-800 placeholder-gray-400 transparent-scrollbar"
        placeholder="Type your message..."
      />
      <button
        onClick={handleMic}
        className={`w-12 h-12 mt-2 flex mr-2 justify-center items-center text-white rounded-full shadow-md ${
          isListening ? "bg-red-600" : "bg-zinc-700 hover:bg-zinc-600"
        }`}
        title={isListening ? "Stop Listening" : "Start Listening"}
      >
        <FaMicrophone size={20} />
      </button>
      <button
        onClick={handleSend}
        className="w-12 h-12 mt-2 flex mr-10 justify-center items-center text-white rounded-full bg-blue-600 hover:bg-blue-700 shadow-md"
      >
        <FaPaperPlane size={20} />
      </button>
    </div>
  );
};

export default Sendplane;
