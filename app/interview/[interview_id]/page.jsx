"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AlertCircle, Clock, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { useRouter } from "next/navigation";

const Interview = () => {
  const { interview_id } = useParams();
  console.log("interview id", interview_id);
  const [interviewDetails, setInterviewDetails] = useState([]);
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [loading, setLoading] = useState(false);
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("jobTitle, jobDescription, duration, type")
        .eq("interview_id", interview_id);

      setInterviewDetails(Interviews[0]);
      if (Interviews?.length == 0) {
        toast("Link Entered is invalid");
        return;
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Interview Data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const onJoinInterview = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("*")
        .eq("interview_id", interview_id);

      console.log(Interviews[0]);
      setInterviewInfo({
        userName,
        userEmail,
        interviewDetails: Interviews[0],
      });
      console.log("Interviews:", Interviews);

      setLoading(false);
      router.push("/interview/" + interview_id + "/start");
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Logo Section */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Image
                src={"/logo-new.svg"}
                alt="logo"
                width={160}
                height={80}
                className="h-auto"
              />
            </div>
            <h1 className="text-white text-lg sm:text-xl font-semibold">
              AI-Powered Interview Platform
            </h1>
          </div>

          {/* Interview Image */}
          <div className="flex justify-center">
            <Image
              src={"/Job Interview.png"}
              width={280}
              height={280}
              alt="interview-image"
              className="w-full max-w-[280px] h-auto"
            />
          </div>

          {/* Interview Details */}
          <div className="text-center space-y-2">
            <h2 className="text-white text-xl sm:text-2xl font-bold">
              {interviewDetails?.jobTitle || "Loading..."}
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {interviewDetails?.duration} Minutes
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">
                Full Name
              </label>
              <Input
                placeholder="e.g. John Smith"
                value={userName || ""}
                onChange={(event) => setUserName(event.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm font-medium">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="johnsmith@gmail.com"
                value={userEmail || ""}
                onChange={(event) => setUserEmail(event.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-blue-300 font-semibold text-sm">
                  Before you begin
                </h3>
                <ul className="text-blue-200 text-xs space-y-1">
                  <li>• Ensure stable internet connection</li>
                  <li>• Test your camera and microphone</li>
                  <li>• Find a quiet place for interview</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Join Button */}
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !userName || !userEmail}
            onClick={onJoinInterview}
          >
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : (
                <Video className="w-4 h-4" />
              )}
              {loading ? "Joining..." : "Join Interview"}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Interview;