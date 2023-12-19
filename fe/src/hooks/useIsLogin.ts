import { useEffect, useState } from "react";

export default function useIsLogin() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("UTK");
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  });

  return isLogin;
}
