import { ReactNode, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useGeneralStore } from "../stores/generalStore";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state);
  const navigate = useNavigate();
  const setIsLoginOpen = useGeneralStore((state) => state.setIsLoginOpen);
  useEffect(() => {
    if (!user.id) {
      navigate("/");
      setIsLoginOpen(true);
    }
  }, [user.id, navigate, setIsLoginOpen]);

  if (!user.id) {
    return <>No Access</>;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
