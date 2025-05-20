import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Chatwindow from "../components/main";
import { useState, useEffect } from "react";
const Botlayout = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 }); // for Animation
  }, []);
  //=========================States===============================
  const [History_Chat_id, setHistory_Chat_id] = useState(null);
  const [UI, setUI] = useState([]);
  const [chatid, setChatid] = useState(null);
  const handlechatid = (id) => {
    setChatid(id); // set chat id for new chat conversation
  };
  //=========================Handle-Functions=======================
  const handleNewUI = () => {
    setUI([]); // reset message UI
    setHistory_Chat_id(null); // optional: clear selected chat
  };
  const handleSelectHistory = (_id) => {
    setHistory_Chat_id(_id);
    localStorage.setItem("History_Chat_id", _id); // Optional, for persistence
  };
  return (
    <>
      {/* Container */}
      <div
        data-aos="zoom-in"
        className="w-[95%] mx-auto mt-2 min-h-[33rem] shadow-2xl  shadow-black  bg-zinc-900 rounded-tl-3xl rounded-tr-3xl"
      >
        {/* Header */}
        <Header />

        {/* Flex Window */}
        <div className="flex w-full min-h-[29rem]  bg-zinc-900">
          <Sidebar
            newchatid={chatid}
            UIclear={handleNewUI}
            onSelectHistory={handleSelectHistory}
          />
          <Chatwindow
            setchatid={handlechatid}
            UI={UI}
            History_Chat_id={History_Chat_id}
          />
        </div>
      </div>
    </>
  );
};

export default Botlayout;
