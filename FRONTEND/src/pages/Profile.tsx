import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
// import { useUserStore } from "../stores/userStore";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries/GetUsers";
import { User } from "../gql/graphql";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillUnlock } from "react-icons/ai";

function Profile() {
  const params = useParams();
  const { data: users } = useQuery(GET_USERS);

  const userId = params.id ? parseInt(params.id, 10) : undefined;
  const user = users
    ? users.getUsers.find((user: User) => user.id === userId)
    : null;

  const setIsEditOverlayOpen = () => {
    console.log("setIsEditOverlayOpen");
  };

  return (
    <MainLayout>
      yo
      <div className="pt-[90px] 2xl:pl-[385px] lg:pl-[260px] pl-[80px] lg:pr-0 pr-2 w-[calc(100%-10px)] max-w-1800px 2xl:mx-auto">
        <div className="flex w-[calc(100vw-230px)]">
          <img
            className="w-[100]  h-[100px] rounded-full object-cover"
            src={
              !user.image ? "https://picsum.photos/id/83/300/320" : user.image
            }
          />
          <div className="w-full ml-5">
            <div className="text-[30px] font-bold truncate">User name</div>
            <div className="text-[18px] truncate">{user.fullname}</div>
            <button
              onClick={setIsEditOverlayOpen}
              className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
            >
              <BsFillPencilFill size="18" className="mt-0.5 mr-1" />
              <div>Edit Profile</div>
            </button>
            <button className="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]">
              Follow
            </button>
          </div>
        </div>
        <div className="flex items-center pt-4">
          <div className="mr-4">
            <span className="font-bold">10k</span>
            <span className="text-gray-500 font-leight text-[15px] pl-1.5">
              Following
            </span>
          </div>
          <div className="mr-4">
            <span className="font-bold">44k</span>
            <span className="text-gray-500 font-leight text-[15px] pl-1.5">
              Followers
            </span>
          </div>
          <div className="mr-4">
            <span className="font-bold">4k</span>
            <span className="text-gray-500 font-leight text-[15px] pl-1.5">
              Likes
            </span>
          </div>
        </div>
        <div className="pt-5 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
          This is the bio section
        </div>
        <div className="flex items-center w-full pt-4 border-b">
          <div className="w-60 text-center py-5 text-[17px] font-semibold border-b-2 border-b-black">
            Videos
          </div>
          <div className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">
            <AiFillUnlock className="mb-0.5" />
            Liked
          </div>
        </div>

        {/* <div className="grid grid-cols-2 gap-3 mt-4 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
          {data?.getPostsByUserId.map((post: any) => (
            <PostUser key={post.id} post={post} />
          ))}
        </div> */}
      </div>
    </MainLayout>
  );
}

export default Profile;
