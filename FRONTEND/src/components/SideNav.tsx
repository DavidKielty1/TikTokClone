import { useLocation, Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries/GetUsers";
import { useState } from "react";
import { User } from "../gql/graphql";
import MenuItemSuggested from "./MenuItemSuggested";

function SideNav() {
  const { data } = useQuery(GET_USERS);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const displayedUsers: User[] = showAllUsers
    ? data?.getUsers
    : data?.getUsers.slice(0, 3);

  return (
    <div
      id="SideNav"
      className={[
        useLocation().pathname === "/" ? "lg:w-[310px]" : "lg:w-[220px]",
        "fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r overflow-auto",
      ].join(" ")}
    >
      <div className="lg:w-full w-[55px] mx-auto">
        <Link to="/">
          <MenuItem
            iconString="For You"
            colorString="#F02C56"
            sizeString="30"
          />
        </Link>
        <MenuItem iconString="Following" colorString="black" sizeString="30" />
        <MenuItem iconString="LIVE" colorString="black" sizeString="27" />
        <div className="border-b lg:ml-2 mt-2" />
        <div className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
          Suggest Accounts
        </div>
        <div className="lg:hidden block pt-3"></div>
        <ul>
          {displayedUsers?.map((user) => (
            <li className="cursor-pointer" key={user.id}>
              <Link to={`/profile/${user.id}`}>
                <MenuItemSuggested user={user} />
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowAllUsers(!showAllUsers)}
          className="lg:block hidden text-pinkred pt-1.5 pl-2 text-[13px]"
        />
      </div>
    </div>
  );
}

export default SideNav;
