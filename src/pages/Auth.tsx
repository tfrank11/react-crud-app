import React, { useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const Auth = () => {
  const [authType, setAuthType] = useState<"signup" | "login">("signup");

  return (
    <div>
      <div className="h-screen w-screen bg-slate-500">
        <div className="absolute m-auto top-0 bottom-0 left-0 right-0 sm:w-3/5 md:w-3/5 lg:w-2/5 xl:w-1/3 h-2/3 rounded-md shadow-xl text-center bg-gray-100 overflow-y-auto">
          {authType === "signup" && (
            <Signup switchToLogin={() => setAuthType("login")} />
          )}
          {authType === "login" && (
            <Login switchToSignup={() => setAuthType("signup")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
