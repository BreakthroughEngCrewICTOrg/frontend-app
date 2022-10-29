import React, { useEffect } from "react";
import UserDashboard from "pages/user/profile";
import Login from "pages/auth/login";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  let userToken;

  if (typeof window !== "undefined") {
    // Perform localStorage action
    userToken = localStorage.getItem("token");
  }

  useEffect(() => {
    // redirect to home if already logged in
    if (!userToken) {
      router.push("/auth/login");
    }
  }, [router, userToken]);

  // const user = false;

  // if (!userToken) {

  //   return router.push("/auth/login");
  // }

  return <UserDashboard />;
};

export default Index;
