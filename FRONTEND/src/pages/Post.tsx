import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ImCross } from "react-icons/im";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BsMusicNoteBeamed, BsFillChatDotsFill } from "react-icons/bs";
import { AiFillHeart, AiFillPlayCircle } from "react-icons/ai";
import { GET_POST_BY_ID } from "../graphql/queries/GetPostById";
import { LIKE_POST } from "../graphql/mutations/LikePost";
import { UNLIKE_POST } from "../graphql/mutations/UnlikePost";
import { CREATE_COMMENT } from "../graphql/mutations/CreateComment";
import { GET_COMMENTS_BY_POST_ID } from "../graphql/queries/GetCommentsByPostId";
import { DELETE_COMMENT } from "../graphql/mutations/DeleteComment";
import { GetCommentsByPostIdQuery, GetPostByIdQuery } from "../gql/graphql";
import { usePostStore } from "../stores/postStore";
import { useUserStore } from "../stores/userStore";

function Post() {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = React.useState<string>("");
  const navigate = useNavigate();

  const [createComment, { data: newComments }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      {
        query: GET_COMMENTS_BY_POST_ID,
        variables: {
          postId: Number(id),
          text: comment,
        },
      },
    ],
  });
  const addComment = async () => {
    await createComment({
      variables: {
        postId: Number(id),
        text: comment,
      },
    });
    console.log(newComments);
    setComment("");
  };

  const { data: postComments } = useQuery<GetCommentsByPostIdQuery>(
    GET_COMMENTS_BY_POST_ID,
    {
      variables: {
        postId: Number(id),
      },
    }
  );
  console.log(postComments);

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update(cache, { data: { deleteComment } }) {
      const deletedCommentId = deleteComment.id;
      const existingComments = cache.readQuery<GetCommentsByPostIdQuery>({
        query: GET_COMMENTS_BY_POST_ID,
        variables: { postId: Number(id) },
      });

      const newComments = existingComments?.getCommentsByPostId.filter(
        (comment) => comment.id !== deletedCommentId
      );
      cache.writeQuery({
        query: GET_COMMENTS_BY_POST_ID,
        data: { getCommentsByPostId: newComments },
        variables: { postId: Number(id) },
      });
    },
  });
  const handleDeleteComment = async (commentId: number) => {
    await deleteComment({
      variables: {
        id: commentId,
      },
    });
  };

  const [currentPostIdIndex, setCurrentPostIdIndex] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { data: dataPost, loading: loadingPost } = useQuery<GetPostByIdQuery>(
    GET_POST_BY_ID,
    {
      variables: {
        id: Number(id),
      },
      onCompleted: () => {
        console.log(dataPost);
        setIsLoaded(true);
      },
    }
  );

  const loopThroughPostsUp = () => {
    if (
      dataPost?.getPostById.otherPostIds &&
      currentPostIdIndex === dataPost?.getPostById.otherPostIds.length - 1
    )
      return;
    setCurrentPostIdIndex(currentPostIdIndex + 1);
    if (!dataPost?.getPostById.otherPostIds) return;
    const nextPostId =
      dataPost?.getPostById?.otherPostIds[currentPostIdIndex + 1];
    navigate(`/post/${nextPostId}`);
  };
  const loopThroughPostsDown = () => {
    if (currentPostIdIndex === 0) return;
    setCurrentPostIdIndex(currentPostIdIndex - 1);
    if (!dataPost?.getPostById.otherPostIds) return;
    const nextPostId =
      dataPost?.getPostById.otherPostIds[currentPostIdIndex - 1];
    navigate(`/post/${nextPostId}`);
  };

  const [inputFocused, setInputFocused] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleLoadedData = () => {
      console.log("loaded");
      video.current?.play();
      setTimeout(() => {
        setIsLoaded(true);
      }, 300);
    };

    const videoRef = video.current;
    videoRef?.addEventListener("loadeddata", handleLoadedData);

    return () => {
      if (!videoRef) return;
      videoRef?.removeEventListener("loadeddata", handleLoadedData);
      videoRef?.pause();
      videoRef.currentTime = 0;
      videoRef?.load();
    };
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const toggleVideoPlay = () => {
    if (video.current) {
      if (isPlaying) {
        video.current.pause();
      } else {
        video.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const likedPosts = usePostStore((state) => state.likedPosts);
  const likePost = usePostStore((state) => state.likePost);
  const removeLike = usePostStore((state) => state.removeLike);
  const loggedInUserId = useUserStore((state) => state.id);

  const [likePostMutation] = useMutation(LIKE_POST, {
    variables: { postId: Number(id) },

    onCompleted: (data) => {
      console.log("LikePostMutationDATA!", data);
    },

    refetchQueries: [
      {
        query: GET_POST_BY_ID,
        variables: {
          id: Number(id),
        },
      },
    ],
  });
  const handleLikePost = async () => {
    if (loggedInUserId == dataPost?.getPostById.user.id) return;
    await likePostMutation();
    likePost({
      id: Number(id),
      userId: Number(loggedInUserId),
      postId: Number(id),
    });
  };

  const [removeLikeMutation] = useMutation(UNLIKE_POST, {
    variables: { postId: Number(id) },

    onCompleted: (data) => {
      console.log("UNLIKEDPOST:", data);
    },

    refetchQueries: [
      {
        query: GET_POST_BY_ID,
        variables: {
          id: Number(id),
        },
      },
    ],
  });
  const handleRemoveLike = async () => {
    console.log(
      "loggedInUser:",
      loggedInUserId,
      "likedByUser:",
      dataPost?.getPostById.user.id
    );
    if (loggedInUserId == dataPost?.getPostById.user.id) return;
    await removeLikeMutation();
    removeLike(Number(id));
  };

  const isLiked = likedPosts.some((likedPost) => {
    if (!likedPost) return false;
    return likedPost.userId === Number(loggedInUserId);
  });

  return (
    <div
      className="fixed top-0 left-0 z-50 justify-between w-full h-full overflow-auto bg-black lg:flex lg:overflow-hidden "
      id="Post"
    >
      <div className="lg:w-[calc(100%-540px)] h-full relative">
        <Link
          to="/"
          className="absolute z-20 m-5 rounded-full hover:bg-gray-800 bg-gray-700 p-1.5"
        >
          <ImCross color="white" size="27" />
        </Link>
        <button
          onClick={loopThroughPostsUp}
          className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <BiChevronUp color="white" size="30" />
        </button>
        <button
          onClick={loopThroughPostsDown}
          className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <BiChevronDown color="white" size="30" />
        </button>
        {true && (
          <div>
            <button
              disabled={!isLoaded}
              onClick={loopThroughPostsUp}
              className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
            >
              <BiChevronUp color="white" size="30" />
            </button>
            <button
              disabled={!isLoaded}
              onClick={loopThroughPostsDown}
              className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
            >
              <BiChevronDown color="white" size="30" />
            </button>
          </div>
        )}

        <img
          className="absolute top-[18px] left-[70px] max-w-[80px] rounded-full lg:mx-0 mx-auto"
          src="/src/assets/images/tiktok-logo-small.png"
        />

        {loadingPost ? (
          <div className="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[400px]">
            <ImSpinner2
              className="ml-1 animate-spin"
              size="100"
              color="white"
            />
          </div>
        ) : (
          <div
            className="bg-black bg-opacity-90 lg:min-w-[480px] "
            onClick={toggleVideoPlay}
          >
            <video
              ref={video}
              src={"http://localhost:3000/" + dataPost?.getPostById.video}
              loop
              muted
              className="h-screen mx-auto"
            />
            {!isPlaying && (
              <AiFillPlayCircle
                size="100"
                className="absolute text-black transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer z-100 top-1/2 left-1/2"
              />
            )}
          </div>
        )}
      </div>
      <div
        className="lg:max-w-[550px] relative w-full h-full bg-white"
        id="InfoSection"
      >
        <div className="py-7" />
        <div className="flex items-center justify-between px-8">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="mx-auto rounded-full lg:mx-0"
                width="40"
                src={
                  dataPost?.getPostById.user.image ||
                  "https://picsum.photos/id/8/300/320"
                }
              />
            </Link>
            <div className="ml-3 pt-0.5">
              <div className="text-[17px] font-semibold">User name</div>
              <div className="text-[13px] -mt-5 font-light">
                {dataPost?.getPostById?.user.fullname}
                <span className="relative top-[6px] text-[30px] pr-0.5">•</span>
                <span className="font-medium">
                  {new Date(dataPost?.getPostById?.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <MdOutlineDeleteForever size="25" className="cursor-pointer" />
        </div>
        <div className="px-8 mt-4 text-sm"> {dataPost?.getPostById?.text}</div>

        <div className="px-8 mt-4 text-sm font-bold">
          <BsMusicNoteBeamed size="17" />
          Original sound - {dataPost?.getPostById.user.fullname}
        </div>
        <div className="flex items-center px-8 mt-8">
          <div className="flex items-center pb-4 text-center">
            <button
              disabled={dataPost?.getPostById.user.id === loggedInUserId}
              className="p-2 bg-gray-200 rounded-full cursor-pointer"
              onClick={() => (isLiked ? handleRemoveLike() : handleLikePost())}
            >
              <AiFillHeart size="25" color={isLiked ? "red" : "black"} />
            </button>
            <span className="pl-2 pr-4 text-xs font-semibold text-gray-800">
              {dataPost?.getPostById?.likes?.length}
            </span>
          </div>
          <div className="flex items-center pb-4 text-center">
            <div className="p-2 bg-gray-200 rounded-full cursor-pointer">
              <BsFillChatDotsFill size="25" color="black" />
            </div>
            <span className="pl-2 pr-4 text-xs font-semibold text-gray-800">
              {postComments?.getCommentsByPostId?.length}
            </span>
          </div>
        </div>
        <div
          id="Comments"
          className="bg-[#F8F8F8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
        >
          <div className="pt-2" />
          {postComments?.getCommentsByPostId.length === 0 && (
            <div className="mt-6 text-xl text-center text-gray-500">
              No comments...
            </div>
          )}
          <div className="flex flex-col items-center justify-between px-8 mt-4">
            {postComments?.getCommentsByPostId.map((comment) => (
              <div
                className="relative flex items-center w-full"
                key={comment.id}
              >
                <Link to="/">
                  <img
                    className="absolute top-0 mx-auto rounded-full lg:mx-0"
                    width="40"
                    src={
                      comment.user.image || "https://picsum.photos/id/8/300/320"
                    }
                  />
                </Link>
                <div className="ml-14 pt-0.5 w-full">
                  <div className="text-[18px] font-semibold flex items-center justify-between">
                    User name
                    {comment.user.id === Number(loggedInUserId) && (
                      <MdOutlineDeleteForever
                        onClick={() => handleDeleteComment(comment.id)}
                        size="25"
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                  <div className="text-[15px] font-light">{comment.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-28" />
        </div>
        <div
          id="CreateComment"
          className="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2 "
        >
          <div
            className={[
              inputFocused
                ? "border-2 border-gray-400"
                : "border-2 border-[#F1F1F2]",
              "flex items-center rounded-lg w-full lg:max-w-[420px] bg-[#F1F1F2] ",
            ].join(" ")}
          >
            <input
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className="bg-[#F1F1F2] tex-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
              type="text"
              placeholder="Add a comment..."
            />
          </div>
          <button
            disabled={!comment}
            onClick={addComment}
            className={[
              comment ? "text-pinkred cursor-pointer" : "text-gray-400",
              "font-semibold text-sm ml-5 pr-1",
            ].join(" ")}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
