import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Header = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const modalRef = useRef();
  const Navigate = useNavigate();

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLogoutModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Before removal:", Cookies.get("UserToken"));

    Cookies.remove("UserToken");
    console.log("After removal:", Cookies.get("UserToken"));

    localStorage.removeItem("newconid");
    localStorage.removeItem("History_Chat_id");
    Navigate("/");
  };

  return (
    <>
      <header>
        <div className="bg-zinc-900 w-full min-h-[4rem] flex justify-between items-center rounded-tr-3xl rounded-tl-3xl">
          <div className="bg-black w-[30%] h-[4rem] rounded-tl-3xl">
            <h1 className="w-full h-[4rem] text-6xl text-center font-bold text-white">
              BOT-X
            </h1>
          </div>

          <div className="bg-black w-[70%] min-h-[4rem] flex rounded-tr-3xl relative">
            <div className="w-[85%] ml-20 flex justify-center items-center bg-black text-white font-bold text-5xl min-h-[4rem] text-center">
              <h1>ASK!</h1>
            </div>

            <div className="rounded-tr-3xl flex justify-center items-center w-[15%] min-h-[4rem] bg-black relative">
              <div
                className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 ring-white transition"
                onClick={() => setShowLogoutModal((prev) => !prev)}
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="public/Images/P1.jpg"
                  alt="Profile"
                />
              </div>

              {/* Logout Modal */}
              {showLogoutModal && (
                <div
                  ref={modalRef}
                  className="absolute top-14 right-2 bg-white shadow-lg rounded-md px-4 py-2 z-50"
                >
                  <p className="text-gray-800 mb-2">Are you sure?</p>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded w-full text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
