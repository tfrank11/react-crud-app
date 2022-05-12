import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import React from "react";

const SpinnerDiv = () => {
  return (
    <div className="bg-slate-400 h-screen w-full">
      <div className="bg-transparent h-fit w-fit absolute m-auto left-0 right-0 top-0 bottom-0">
        <CircularProgress size={60} />
      </div>
    </div>
  );
};

export default SpinnerDiv;
