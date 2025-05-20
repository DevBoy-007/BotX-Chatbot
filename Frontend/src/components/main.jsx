import Chatpage from "../pages/chat";
import Sendplane from "../components/send";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Chatwindow = ({ History_Chat_id, UI, setchatid }) => {
  //=============================States========================================
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // New loading state

  //  Deal with new conversation id
  useEffect(() => {
    if (localStorage.getItem("newconid") !== null) {
      const newconid = localStorage.getItem("newconid");
      getHistory(newconid); // get chat history for existing conversation
    }
    if (localStorage.getItem("History_Chat_id") !== null) {
      const History_Chat_id = localStorage.getItem("History_Chat_id");
      getHistory(History_Chat_id); // get chat history for existing conversation
    }
  }, []);

  // Deal with chat history Id
  useEffect(() => {
    if (
      History_Chat_id !== null &&
      History_Chat_id !== undefined &&
      History_Chat_id !== ""
    ) {
      setMessageList([]);
      getHistory(History_Chat_id);
    } else {
      setMessageList(UI);
    }
  }, [History_Chat_id, UI]);

  //=============================Get-current-Chat-History==============================
  const getHistory = async (_id) => {
    try {
      const get_response = await axios.get(
        `http://localhost:3000/currentchat/messages/${_id}`,
        {
          withCredentials: true,
        }
      );

      const History_list = get_response.data.response;

      setMessageList(History_list);
    } catch (error) {
      console.log(error.message);
    }
  };
  //===========================Create-Conversation-ID===============================
  const getconid = async () => {
    try {
      const id_response = await axios.post(
        "http://localhost:3000/conversation_id/conid",
        {},
        {
          withCredentials: true,
        }
      );
      const newconid = id_response.data.newconid;
      localStorage.setItem("newconid", newconid);
      setchatid(newconid);
      console.log("chatwindow:", newconid);
    } catch (error) {
      console.error("Error getting conversation ID:", error);
    }
  };

  //===========================Send-Button-Operation============================
  const handleSend = async (input) => {
    if (localStorage.getItem("newconid") === null) {
      await getconid(); // get conversation id for new chat conversation
    }
    const newconid = localStorage.getItem("newconid");
    const newList = [...messageList, input];
    setMessageList(newList);

    // Show loading message
    const loadingMsg = {
      sender: "Bot",
      prompt: "Bot Typing ...",
    };
    const tempList = [...newList, loadingMsg];
    setMessageList(tempList);
    setLoading(true);

    // sending user message prompt to DB
    try {
      const send_response = await axios.post(
        "http://localhost:3000/prompt/submitting",
        {
          sender: input.sender,
          prompt: input.prompt,
          conid: newconid,
        },
        {
          withCredentials: true,
        }
      );
      if (send_response.data.error) {
        toast.error(send_response.data.error);
      }
      if (send_response.data.error === "Unauthorized User") {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
    // sending prompt to AI Bot API
    const Short_propmt =
      input.prompt +
      ".Please give answer in short paragraph using proper punctuation.";

    try {
      const res = await axios.post(
        "http://localhost:3000/api/ask",
        {
          prompt: Short_propmt,
        },
        {
          withCredentials: true,
        }
      );
      // Bot Response on user prompt
      const cleanprompt = res.data.response
        .replace(/\*\*/g, "")
        .replace(/\s*\([^)]*\)\s*/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const botResponse = {
        sender: "Bot",
        prompt: cleanprompt,
      };
      // Final list of messages to be displayed
      const finalList = [...newList, botResponse];
      setMessageList(finalList);
      // sending bot response to DB
      const bot_response = await axios.post(
        "http://localhost:3000/prompt/submitting",
        {
          sender: botResponse.sender,
          prompt: botResponse.prompt,
          conid: newconid,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error talking to BOT-X:", error);
    }
  };
  return (
    <>
      <div className="w-[70%] min-h-[29rem] bg-black flex flex-col">
        <Chatpage messageList={messageList} />
        <Sendplane onSend={handleSend} />
      </div>
    </>
  );
};

export default Chatwindow;
