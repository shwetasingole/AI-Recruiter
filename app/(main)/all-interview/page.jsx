"use client";
import React, { useEffect, useState } from "react";
import { CopyIcon, PhoneCallIcon, SendIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";

const AllInterview = () => {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const getInterviewList = async () => {
      if (!user?.email) return; // Wait until user is ready

      const { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("*")
        .eq("userEmail", user.email)
        .order("id", { ascending: false })
       

      if (error) {
        console.error("❌ Supabase error:", error.message);
      } else {
        console.log("✅ Fetched Interviews:", Interviews);
        setInterviewList(Interviews);
      }
    };

    getInterviewList();
  }, [user]); 

  if (!user) {
    return <p>Loading user...</p>;
  }

  const copyLink = (interviewId) => {
    const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interviewId}`;
    console.log(url);
    navigator.clipboard.writeText(url);
    toast("Copied Link");
  };
  const onSend = (interviewId) => {
    const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interviewId}`;
    const subject = encodeURIComponent("Aicruiter Interview Link");
    const body = encodeURIComponent("Interview Link: " + url);

    window.open(
      `https://mail.google.com/mail/?view=cm&to=shwetaingole27@gmail.com&su=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
   <div className="my-10">
         <h2 className="font-bold text-2xl text-gray-300">All Interviews</h2>
         {interviewList.length === 0 ? (
           <div className="p-5 flex flex-col gap-3 items-center justify-center  mt-4 rounded ">
             <Video className="h-12 w-12 text-blue-600 bg-blue-100 p-3 rounded-lg" />
             <h2 className="font-bold text-lg text-gray-300">You don't have any interview created!</h2>
             <Button className="bg-blue-600">Create New Interview</Button>
           </div>
         ) : (
           <div className="">
             <div className="mt-4 space-y-2 grid   md:grid-cols-2 lg:grid-cols-3 gap-5">
               {interviewList.map((item, index) => (
                 <div
                   className="p-5  bg-white/20 backdrop-blur-sm border border-white/50 rounded-md flex flex-col gap-2  shadow text-white"
                   key={index}
                 >
                   <div className="flex justify-between items-center">
                     <h2 className="text-xs">{item?.created_at?.split("T")[0]}</h2>
                     <PhoneCallIcon className="text-blue-500 bg-blue-100 p-1 rounded" />
                   </div>
   
                   <h2 key={item.id} className="text-sm font-bold">
                     {item.jobTitle || "Untitled Interview"}
                   </h2>
                   <p className="text-gray-300 text-xs">
                     {item?.duration} minutes
                   </p>
                   <div className="flex justify-between items-center gap-2 mt-1">
                     <Button
                       className="text-sm bg-blue-600 flex items-center gap-1 px-2 py-1"
                       onClick={() => copyLink(item.interview_id)}
                     >
                       <CopyIcon className="w-3 h-3 " />
                       Copy Link
                     </Button>
                     <Button
                       className="text-sm bg-blue-600 flex items-center gap-1 px-2 py-1"
                       onClick={() => onSend(item.interview_id)}
                     >
                       <SendIcon className="w-3 h-3" />
                       Send
                     </Button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         )}
       </div>
  );
};

export default AllInterview;
