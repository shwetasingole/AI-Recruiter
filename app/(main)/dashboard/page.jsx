"use client";
import { useEffect } from "react";
import { supabase } from "@/services/supabaseClient";
import React, { use } from "react";
import WelcomeContainer from "./_components/WelcomeContainer";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewList from "./_components/LatestInterviewList";
import { useRouter } from "next/navigation";

const DashBoard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push("/auth");
      } else {
        setIsLoading(false);
      }
    };
    checkSession();
  }, [router]);
  if (isLoading) {
    return <p className="text-center p-10">Loading...</p>;
  }
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
