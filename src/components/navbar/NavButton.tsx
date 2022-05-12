import React from "react";

import CreateIcon from "@mui/icons-material/Create";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  buttonType: "create" | "read" | "update" | "delete" | "logout";
  selected: boolean;
  onClick?: (e: React.MouseEvent) => void; //should only be used for the logout button
}

const NavButton: React.FC<Props> = ({ buttonType, selected, onClick }) => {
  const unselectedButton = (
    <div
      className="relative flex items-center justify-center h-16 w-16 mt-4 mb-4 mx-auto shadow-lg bg-gray-600 hover:bg-blue-600 rounded-3xl hover:rounded-md transition-all hover:cursor-pointer duration-300 group text-blue-400"
      onClick={onClick}
    >
      {buttonType === "create" && <CreateIcon fontSize="large" />}
      {buttonType === "read" && <TextSnippetIcon fontSize="large" />}
      {buttonType === "update" && <UpdateIcon fontSize="large" />}
      {buttonType === "delete" && <DeleteForeverIcon fontSize="large" />}
      {buttonType === "logout" && <LogoutIcon color="error" />}
      <div className="absolute text-white font-bold bg-gray-800 rounded-md left-20 px-2 py-1 scale-0 group-hover:scale-100 transition-all duration-300 z-10">
        {buttonType === "create" && "Create"}
        {buttonType === "read" && "Read"}
        {buttonType === "update" && "Update"}
        {buttonType === "delete" && "Delete"}
        {buttonType === "logout" && "Logout"}
      </div>
    </div>
  );

  const selectedButton = (
    <div className="relative flex items-center justify-center h-16 w-16 mt-4 mb-4 mx-auto shadow-lg bg-blue-800 rounded-md transition-all hover:cursor-pointer text-blue-400 border-blue-900">
      {buttonType === "create" && <CreateIcon fontSize="large" />}
      {buttonType === "read" && <TextSnippetIcon fontSize="large" />}
      {buttonType === "update" && <UpdateIcon fontSize="large" />}
      {buttonType === "delete" && <DeleteForeverIcon fontSize="large" />}
      {buttonType === "logout" && <LogoutIcon color="error" />}
    </div>
  );

  return <>{selected ? selectedButton : unselectedButton}</>;
};

export default NavButton;
