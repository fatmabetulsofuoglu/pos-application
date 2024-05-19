import React from "react";

export const PageTitle = ({ children }) => {
  return (
    <h1
      className="text-3xl font bold mb-3 px-5 py-5 bg-white text-black border border-[#f0f0f0] rounded-md"
    >
      {children}
    </h1>
  );
};
export default PageTitle;
	