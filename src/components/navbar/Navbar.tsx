import React from "react";
import NavButton from "./NavButton";
import { useLocation, Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname.replace("/", "");
  const auth = getAuth();

  const logoutUser = (e: React.MouseEvent): void => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="absolute top-0 left-0 h-screen m-0 flex flex-col bg-gray-900 text-blue-50 shadow-xl w-24">
      <div className="mt-2">
        <Link to="/create">
          <NavButton buttonType="create" selected={path === "create"} />
        </Link>
        <Link to="/read">
          <NavButton buttonType="read" selected={path === "read"} />
        </Link>
        <Link to="/update">
          <NavButton buttonType="update" selected={path === "update"} />
        </Link>
        <Link to="/delete">
          <NavButton buttonType="delete" selected={path === "delete"} />
        </Link>
        <div className="absolute bottom-0 ml-4">
          <NavButton
            buttonType="logout"
            selected={path === "logout"}
            onClick={logoutUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
