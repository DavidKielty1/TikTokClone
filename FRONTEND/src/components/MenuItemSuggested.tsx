import { AiOutlineCheck } from "react-icons/ai";
import { User } from "../gql/graphql";

function MenuItemFollow({ user }: { user: User }) {
  return (
    <div className="flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2">
      <img
        className="rounded-full lg:mx-0 mx-auto"
        width="35"
        src={user?.image ? user.image : "https://picsum.photos/200"}
        alt=""
      />
      <div className="lg:pl-2.5 lg:block hidden">
        <div className="flex items-center">
          <div className="font-bold text-[14px]">User name</div>
          <div className="ml-1 rounded-full bg-[#58D5EC] h-[14px] relative">
            <AiOutlineCheck className="relative" color="white" size="15" />
          </div>
        </div>
        <div className="font-flight text-[12px] text-gray-500">
          {user?.fullname}
        </div>
      </div>
    </div>
  );
}

export default MenuItemFollow;
