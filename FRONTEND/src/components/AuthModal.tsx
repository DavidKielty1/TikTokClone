import { useState } from "react";
import { useGeneralStore } from "../stores/generalStore";
import { ImCross } from "react-icons/im";
import Login from "./Login";
import Register from "./Register";

function AuthModal() {
  const [isRegistered, setIsRegistered] = useState(false);
  const setIsLoginIsOpen = useGeneralStore((state) => state.setIsLoginOpen);
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);

  return (
    <div
      id="AuthModal"
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative w-full bg-white max-w-[470px] h-[70%] p-4 rounded-lg">
        <div className="flex justify-end w-full">
          <button
            onClick={() => setIsLoginIsOpen(!isLoginOpen)}
            className="p-1.5 rounded-full bg-gray-50"
          >
            <ImCross color="#000000" size="26" />
          </button>
        </div>
        {isRegistered ? <Login /> : <Register />}
        <div className="absolute bottom-0 left-0 flex items-center justify-center w-full py-5 border-t">
          <span className="text-[14px] text-gray-600">
            Don't have an account?
          </span>
          <button
            onClick={() => setIsRegistered(!isRegistered)}
            className="text-[14px] text-pinkred font-semibold pl-1"
          >
            {isRegistered ? <span>Sign Up</span> : <span>Log in</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
