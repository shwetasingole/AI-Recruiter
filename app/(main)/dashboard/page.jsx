import React from "react";
import WelcomeContainer from "./_components/WelcomeContainer";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewList from "./_components/LatestInterviewList";

const DashBoard = () => {
  return (
    <div className="">
      {/* <WelcomeContainer /> */}
      <h2 className="my-6 font-bold text-3xl">Dashboard</h2>
      <CreateOptions />

      <LatestInterviewList />
    </div>
  );
};

export default DashBoard;
