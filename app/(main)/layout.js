import React from "react";
import DashBoardProvider from "./provider";

const DashBoardLayout = ({ children }) => {
  return (
    <div>
      <DashBoardProvider>{children}</DashBoardProvider>
    </div>
  );
};

export default DashBoardLayout;
