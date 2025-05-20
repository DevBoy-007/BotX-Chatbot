const Messagebubble = ({ sender, text }) => {
  const isUser = sender === "User";
  return (
    <div
      className={`p-3 mt-8 mb-5 text-white rounded-lg text-justify break-words
        ${isUser ? "ml-4  bg-neutral-500" : "ml-auto bg-pink-900 mr-3"}
        max-w-[75%] w-fit`}
    >
      <p>{text}</p>
    </div>
  );
};

export default Messagebubble;
