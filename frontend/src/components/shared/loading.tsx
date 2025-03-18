import React from "react";

interface LoadingProps {
  message?: string;
}
const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <p className="text-lg">{message || ""}</p>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
};

export default Loading;
