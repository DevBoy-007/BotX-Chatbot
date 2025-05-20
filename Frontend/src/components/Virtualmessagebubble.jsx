const Virtualmessagebubble = ({ sender,text }) => {
  const isUser = sender === "user";
  return (
    <div 
      className={`p-3 mt-20 mb-10 bg-white/10 backdrop-blur-md border border-white/20 max-w-xs shadow-md rounded-lg text-justify text-wrap break-words
          ${isUser ? "ml-32" : "ml-auto mr-32"}
          max-w-[75%] w-fit`}
    >
      <p>{text}</p>
    </div>
  );
};
export default Virtualmessagebubble;
