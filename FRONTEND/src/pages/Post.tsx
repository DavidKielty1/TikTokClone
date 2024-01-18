import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ImCross } from "react-icons/im";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BsMusicNoteBeamed, BsFillChatDotsFill } from "react-icons/bs";
import { AiFillHeart, AiFillPlayCircle } from "react-icons/ai";
import { GET_POST_BY_ID } from "../graphql/queries/getPostById";
import { LIKE_POST } from "../graphql/mutations/likePost";
import { UNLIKE_POST } from "../graphql/mutations/unlikePost";
import { CREATE_COMMENT } from "../graphql/mutations/createComment";
import { GET_COMMENTS_BY_POST_ID } from "../graphql/queries/getCommentsByPostId";
import { DELETE_COMMENT } from "../graphql/mutations/deleteComment";
import { GetCommentsByPostIdQuery } from "../gql/graphql";
import { usePostStore } from "../stores/postStore";
import { useUserStore } from "../stores/userStore";

function Post() {
  return <div>Post</div>;
}

export default Post;
