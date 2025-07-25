"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, CopyIcon, PhoneCallIcon, SendIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import Link from "next/link";
import { toast } from "sonner";
// import { toast } from "sonner";

const ScheduledInterview = () => {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();
  const [viewDetail,setViewDetail]=useState(true);
  const GetInterview = async () => {
    const result = await supabase
      .from("Interviews")
      .select("jobTitle,created_at,duration,interview_id,interview_feedback(userEmail)")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    console.log(result);
    setInterviewList(result.data);
  };
  useEffect(() => {
    user && GetInterview();
  }, [user]);
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
    <div className="my-7">
     <h2 className="font-bold text-2xl text-gray-300">Scheduled Interview Feedback</h2>
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
                       className="p-5  bg-white/20 backdrop-blur-sm border border-white/50 rounded-md flex flex-col gap-2  shadow text-white h-full"
                       key={index}
                     >
                       <div className="flex justify-between items-center h-full">
                         <h2 className="text-xs">{item?.created_at?.split("T")[0]}</h2>
                         <PhoneCallIcon className="text-blue-500 bg-blue-100 p-1 rounded" />
                       </div>
       
                       <h2 key={item.id} className="text-sm font-bold h-full">
                         {item.jobTitle || "Untitled Interview"}
                       </h2>
                       <p className="text-gray-300 text-xs">
                         {item?.duration} minutes
                       </p>
                       <div className="flex  gap-2 mt-1 w-full">
                         
                        {!viewDetail ?<Button
                           className="text-sm bg-blue-600 flex items-center gap-1 px-2 py-1 w-full"
                          //  onClick={() => onSend(item.interview_id)}
                         >
                           <SendIcon className="w-3 h-3" />
                           Send
                         </Button>:<Link href={`/scheduled-interview/${item?.interview_id}/details`}><Button>View Details</Button></Link> }
                       </div>
                     </div>
                   ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduledInterview;
