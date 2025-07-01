import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/AppSideBar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";

const DashBoardProvider = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content Layout */}
      <div className="flex-1 bg-black p-10">
        {/* Trigger button can go anywhere appropriate */}
        {/* <SidebarTrigger className="m-4" /> */}
        <WelcomeContainer />
        {/* Children (actual page content) */}
        {children}
      </div>
    </SidebarProvider>
  );
};

export default DashBoardProvider;
