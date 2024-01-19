import { useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { BsFillBarChartFill } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { PostType } from "../generated/graphql";
import { Link } from "react-router-dom";

function PostProfile({ post }: { post: PostType }) {
  const video = useRef<HtmlVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const handleLoadedData = () => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 300);
    };
    const videoRef = video.current;
    videoRef?.addEventListener("loadeddata", handleLoadedData);
    return () => {
      if (!videoRef) return;
      videoRef?.removeEventListening("loadeddata", handleLoadedData);
      videoRef?.pause();
      videoRef.currentTime = 0;
    };
  }, []);

  const isHover = (bool: boolean) => {
    if (bool) {
      video.current?.play();
    } else {
      video.current?.pause();
    }
  };

  return <div>PostProfile</div>;
}

export default PostProfile;
