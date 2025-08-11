import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Clock, Copy, List, Mail, Plug, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const InterviewLink = ({ interviewId, formData }) => {
  const getInterviewUrl = () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interviewId;
    return url;
  };
  const onCopyLink = async () => {
    const interviewUrl = getInterviewUrl();

    await navigator.clipboard.writeText(interviewUrl);
    toast("Link copied to clipboard!");
  };

 
  return (
    <div className="flex flex-col items-center justify-center mt-10 text-gray-300 ">
      <Image
        src={"/circle.png"}
        alt="check"
        width={50}
        height={50}
        className="mb-1"
      />
      <h2 className="font-bold">Your AI Interview is Ready!</h2>
      <p className="mt-3">
        Share this link with your candidates to start the interview process
      </p>
      <div className="w-full p-7 mt-6 rounded-xl bg-white/20 backdrop-blur-sm border border-white/50 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="font-bold ">Interview Link</h2>
          {/* <h2 className="p-1 px-2 text-sm text-blue-600 bg-blue-50 rounded">
            Valid for 30 Days
          </h2> */}
        </div>
        <div className="mt-2 flex justify-between items-center gap-3">
          <Input defaultValue={getInterviewUrl()} disabled={true} />
          <Button
            onClick={() => onCopyLink()}
            className="bg-blue-600 rounded-lg p-1"
          >
            <Copy /> Copy URL
          </Button>
        </div>
        <hr className="my-7" />
        
          {/* <h2 className="text-xs text-gray-300 flex gap-1 items-center">
            <List className="h-4 w-4" /> 
          </h2>
          <h2 className="text-xs text-gray-300 flex gap-1 items-center">
            <List className="h-4 w-4" /> 10 Questions
          </h2> */}
          {/* <h2 className="text-xs text-gray-500">
                < className="h-4 w-4"/> {formData?.duration} durr
            </h2> */}
        
        
        {/* buttons */}
        <div className="flex justify-between items-center gap-5  mt-7">
          <Link href={"/dashboard"}>
            <Button>
              {" "}
              <ArrowLeft /> Back to Dashboard
            </Button>
          </Link>
          <Link href={"/create-interview"}>
            {" "}
            <Button>
              {" "}
              <Plus />
              Create Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewLink;
