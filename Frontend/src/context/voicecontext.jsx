import React, { useEffect, useRef, useState } from "react";

// Create a context to hold the loaded voice
 const VoiceContext = React.createContext();

const VoiceProvider = ({ children }) => {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const loadVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => voice.lang === "en-US");
      setVoice(englishVoice || voices[0]);
    };

    // On some browsers, voices are loaded asynchronously.
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoice;
    }
    loadVoice();

  }, []);

  return (
    <VoiceContext.Provider value={voice}>
      {children}
    </VoiceContext.Provider>
  );
};
export { VoiceContext, VoiceProvider };