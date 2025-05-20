import { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Sidebar = ({ onSelectHistory, UIclear, newchatid }) => {
  useEffect(() => {
    AOS.init({ duration: 2000 }); // for Animation
  }, []);
  const [Historylist, setHistorylist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    getHistory();
  }, [newchatid]);
  //=============================Getting-Chats-Histories=====================
  const getHistory = async () => {
    try {
      const history_response = await axios.get("http://localhost:3000/chats/histories", {
          withCredentials: true,
        });
     if (history_response.data.error) {
        toast.error(history_response.data.error);
      }
      if (history_response.data.response) {
        const list = history_response.data.response;
        setHistorylist(list);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handlenewchat = async () => {
    try {
      localStorage.removeItem("newconid");
      localStorage.removeItem("History_Chat_id");
      UIclear();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async () => {
    try {
      // Optional: Delete from backend
      const deleteresponse = await axios.delete(
        `http://localhost:3000/removechat/deletechat/${selectedItem.conid}`,
        {
          withCredentials: true,
        }
      );
      if (deleteresponse.data.error) {
        toast.error(deleteresponse.data.error);
      }
      if (deleteresponse.data.error === "Unauthorized User"){
         navigate('/');
      }
      if (deleteresponse.data.response) {
        toast.success(deleteresponse.data.response);
      }
      // Then clear localStorage
      localStorage.removeItem("newconid");
      localStorage.removeItem("History_Chat_id");
      setShowModal(false);
      // Remove from frontend state
      setHistorylist((prev) =>
        prev.filter((item) => item.conid !== selectedItem.conid)
      );
      setShowModal(false);
      setSelectedItem(null);
      UIclear();
    } catch (error) {
      console.log("Error deleting item:", error.message);
    }
  };

  return (
    <>
      <div className="  box-border bg-zinc-900 w-[30%] h-[29 rem] text-white shadow-lg overflow-hidden  relative">
        
        {/* Header buttons */}
        <div className=" flex flex-col space-y-1">
          <button
            onClick={handlenewchat}
            className="w-full py-4  bg-blue-700 hover:bg-red-800 transition-all rounded-none text-white font-semibold shadow-sm hover:shadow-md"
          >
            New Chat
          </button>
          <Link to={"/virtual-assistant"}>
            <button className="w-full py-4  bg-blue-700 hover:bg-red-800 transition-all rounded-none text-white font-semibold shadow-sm hover:shadow-md">
              Virtual Assistant
            </button>
          </Link>
        </div>

        {/* History List */}
        <div className=" box-border w-full  bg-black ">
          <ul
            data-aos="slide-right"
            className="flex h-[22rem]  px-2 py-2 w-full bg-black flex-col space-y-2 divide-y overflow-y-auto transparent-scrollbar divide-gray-700"
          >
            {Historylist.map((item, index) => (
              <li
                onClick={() => {
                  onSelectHistory(item.conid);
                }}
                key={index}
                className="px-4 py-3 hover:bg-gray-800 cursor-pointer transition-all group rounded-md  shadow hover:shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-medium truncate max-w-[180px] group-hover:text-white">
                      {item.title || "Untitled"}
                    </span>
                    <span className="text-sm text-white">
                      {item.date || "Unknown Date"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowModal(true);
                    }}
                    className="text-gray-400 hover:text-red-500 transition text-xl"
                  >
                    &#8942;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Confirm Delete Modal */}
        {showModal && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 w-[80%] max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Delete this chat?</h2>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete "{selectedItem?.title}"? This
                action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
