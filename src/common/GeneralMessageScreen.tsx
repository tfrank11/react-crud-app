import React from "react";

interface Props {
  text: string;
}

const GeneralMessageScreen: React.FC<Props> = ({ text }) => {
  return (
    <div className="bg-slate-400 h-screen w-100">
      <div className="bg-transparent h-fit w-fit absolute m-auto left-0 right-0 top-0 bottom-0">
        <span className="text-lg font-semibold text-gray-800">{text}</span>
      </div>
    </div>
  );
};

export default GeneralMessageScreen;
