import { useEffect, useRef } from "react";
import Messagebubble from "../components/messagebubble";

const Chatpage = ({ messageList }) => {
  const chatEndRef = useRef(null);
  // Deal with Scroll View
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);
  
  return (
    <div className="w-full h-[24rem] bg-neutral-900 relative overflow-y-auto transparent-scrollbar">
      {messageList.map((msg, index) => (
        <Messagebubble key={index} text={msg.prompt} sender={msg.sender} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default Chatpage;
