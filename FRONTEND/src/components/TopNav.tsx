import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import tikTokLogo from "../assets/images/tiktok-logo.png";
import {
  AiOutlineSearch,
  AiOutlineFileSearch,
  AiOutlineUpload,
} from "react-icons/ai";
import {
  //   BsThreeDotsVertical,
  BsFillSendFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { GrLogout } from "react-icons/gr";
import { useGeneralStore } from "../stores/generalStore";
import { useUserStore } from "../stores/userStore";
import { LOGOUT_USER } from "../graphql/mutations/Logout";
import { useMutation } from "@apollo/client";

function TopNav() {
  const loginIsOpen = useGeneralStore((state) => state.isLoginOpen);
  const setLoginIsOpen = useGeneralStore((state) => state.setIsLoginOpen);
  const user = useUserStore((state) => state);
  const setUser = useUserStore((state) => state.setUser);
  const [logoutUser] = useMutation(LOGOUT_USER);

  const location = useLocation();
  const getURL = () => {
    return window.location.pathname;
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser({
        id: undefined,
        fullname: "",
        email: "",
        bio: "",
        image: "",
      });

      setLoginIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      id="TopNav"
      className="bg-white fixed z-30 flex items-center w-full border-b h-[61px]"
    >
      <div
        className={[
          getURL() === "/" ? "max-w-[1150px]" : "",
          "flex items-center justify-between w-full px-6 mx-auto",
        ].join(" ")}
      >
        <div
          className={[getURL() === "/" ? "w-[80%]" : "lg:w-[20%] w-[70%]"].join(
            " "
          )}
        >
          <Link to="/">
            <img
              src={tikTokLogo}
              width={getURL() === "/" ? "100" : "50"}
              height={getURL() === "/" ? "100" : "50"}
              alt="logo"
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center bg-slate-50 p-1 rounded-full max-w-[380px] w-full">
          <input
            type="text"
            className="w-full pl-3 my-2 bg-transparent placeholder-[grey] text-[15px] focus:outline-none"
            placeholder="Search accounts"
          />
          <div className="px-3 py-1 flex items-center border-l-gray-3">
            <AiOutlineSearch size="20" color="grey" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 min-w-[275px] w-full max-w-[320px]">
          {location.pathname === "/" ? (
            <Link
              to="/upload"
              className="flex items-center rounded-sm border px-3 py-[6px] hover:bg-gray-100"
            >
              <AiOutlineUpload size="20" color="darkblue" />
              <span className="px-2 font-medium text-[15px] text-darkblue">
                Upload
              </span>
            </Link>
          ) : (
            <Link
              to="/"
              className="flex items-center rounded-sm border px-3 py-[6px] hover:bg-gray-100"
            >
              <AiOutlineFileSearch size="20" color="darkblue" />
              <span className="px-2 font-medium text-[15px] text-darkblue">
                Feed
              </span>
            </Link>
          )}
          {!user.id && (
            <div className="flex items-center">
              <button
                onClick={() => setLoginIsOpen(!loginIsOpen)}
                className="flex items-center bg-pinkred text-white border rounded-md px-3 py-[6px] min-w-[110px]"
              >
                <span className="mx-4 font-medium text-[15px]">Log In</span>
              </button>
            </div>
          )}
          <div className="flex items-center">
            <BsFillSendFill size="25" color="darkblue" />
            <BiMessageDetail size="25" color="darkblue" />
            <div className="relative">
              <button className="mt-1" onClick={() => setShowMenu(!showMenu)}>
                <img
                  src={!user.image ? "https://picsum.photos/200" : user.image}
                  alt="Profile Image"
                  className="rounded-full"
                  width="33"
                />
              </button>
              <div
                id="PopupMenu"
                className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[43px] -right-2"
              >
                <Link
                  to={`/profile/${user.id}`}
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center px-3 py-2 hover:bg-gray-100 gap-2"
                >
                  <BsFillPersonFill size="20" color="darkblue" />
                  <span className="font-semibold text-sm">Profile</span>
                </Link>
                {user.id && (
                  <div
                    onClick={handleLogout}
                    className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hoer:text-gray-900"
                  >
                    <GrLogout size="20" color="darkblue" />
                    <span className="font-semibold text-sm">Log out</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
