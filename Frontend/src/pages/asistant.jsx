import React, { useEffect, useState, useRef, useContext } from "react";
import { VoiceContext } from "../context/voicecontext";
import axios from "axios";
import Virtualmessagebubble from "../components/Virtualmessagebubble";
import AOS from "aos";
import "aos/dist/aos.css";
const Assistant = () => {
// ================================States===================================
  const [messages, setMessages] = useState([]);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const voice = useContext(VoiceContext);
  const isSpeakingRef = useRef(false);
  const isRecognitionActiveRef = useRef(false);
 useEffect(() => {
    AOS.init({ duration: 2000 }); // for Animation
  }, []);

 // Deal with User Prompt
  const Handleprompt = async (prompt) => {
    try {
      const Bot_response = await axios.post("http://localhost:3000/api/ask", {
        prompt: prompt,
      });
      return Bot_response.data.response;
    } catch (error) {
      console.log(error.message);
    }
  };

  // ✅ Updated speak function: speaks long text sentence-by-sentence
  const speak = (text, callback) => {
    if (!voice) return;

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]; // Split into sentences
    let index = 0;

    const speakNext = () => {
      if (index < sentences.length) {
        const utterance = new SpeechSynthesisUtterance(sentences[index].trim());
        utterance.voice = voice;
        utterance.lang = "en-US";

        utterance.onstart = () => {
          isSpeakingRef.current = true;
          stopRecognition(); // Pause listening while speaking
        };

        utterance.onend = () => {
          index++;
          speakNext(); // Speak next sentence
        };

        speechSynthesis.speak(utterance);
      } else {
        isSpeakingRef.current = false;
        if (typeof callback === "function") callback();
        startRecognition(); // Resume listening
      }
    };

    window.speechSynthesis.cancel(); // Clear previous utterances
    speakNext();
  };
  //  Start-Recongnition Function
  const startRecognition = () => {
    if (recognitionRef.current && !isRecognitionActiveRef.current) {
      recognitionRef.current.start();
      isRecognitionActiveRef.current = true;
    }
  };

 //  Stop-Recongnition Function
  const stopRecognition = () => {
    if (recognitionRef.current && isRecognitionActiveRef.current) {
      recognitionRef.current.stop();
      isRecognitionActiveRef.current = false;
    }
  };
 //  Slicencer-Time Function
  const startSilenceTimer = () => {
    clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = setTimeout(() => {
      const prompt = "Where are you? Let's talk more about things.";
      setMessages((prev) => [...prev, { sender: "bot", text: prompt }]);
      speak(prompt);
      startSilenceTimer();
    }, 8000); // 20 seconds of silence timeout
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    // Initial greeting
    speak("How can I help you?", () => {
      startRecognition();
      startSilenceTimer();
    });

    recognition.onresult = async (event) => {
      clearTimeout(silenceTimerRef.current);
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
      setMessages((prev) => [...prev, { sender: "user", text: transcript }]);

      // Add request for simple and well-punctuated answer
      const promptText =
        transcript +
        ". Please give answer in short paragraph using proper punctuation.";
      const reply = await Handleprompt(promptText);

      // ✅ Only remove **, keep punctuation to split naturally
      const cleanedReply = reply
        .replace(/\*\*/g, "")
        .replace(/\s*\([^)]*\)\s*/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      setMessages((prev) => [...prev, { sender: "bot", text: cleanedReply }]);

      speak(cleanedReply, () => {
        startSilenceTimer();
      });
    };

 //   onEnd Recognition Function
    recognition.onend = () => {
      if (!isSpeakingRef.current) {
        startRecognition();
      }
    };
  //  onError Recognition Function
    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      }
      window.speechSynthesis.cancel();
      clearTimeout(silenceTimerRef.current);
    };
  }, [voice]);

  return (
    <div className="bg-gradient-to-br from-purple-950 via-pink-700 to-purple-950 w-full h-[100vh]  p-4 text-white overflow-y-auto transparent-scrollbar">
      <h2 className="text-center text-5xl mt-8 font-bold mb-4">
        Voice Assistant
      </h2>
      <div className="space-y-2">
        {messages.map((msg, idx) => (
          <Virtualmessagebubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
      </div>
    </div>
  );
};

export default Assistant;
