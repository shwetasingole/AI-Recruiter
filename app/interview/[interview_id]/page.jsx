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
    <div className="min-h-screen bg-gray/80 flex items-center justify-center p-6">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-3xl shadow-2xl p-8 space-y-8">
          
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Image
                src={"/logo-new1.svg"}
                alt="EchoHire Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-300 text-sm font-medium">
              AI-Powered Interview Platform
            </p>
          </div>

          {/* Interview Visual */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <Image
                src={"/Job Interview.png"}
                width={240}
                height={240}
                alt="Interview illustration"
                className="relative z-10 w-60 h-auto rounded-2xl"
              />
            </div>
          </div>

          {/* Interview Info */}
          <div className="text-center space-y-3">
            <h1 className="text-white text-2xl font-bold">
              {interviewDetails?.jobTitle || "Loading Interview..."}
            </h1>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {interviewDetails?.duration} Minutes
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-white text-sm font-semibold mb-2">
                Full Name
              </label>
              <Input
                placeholder="Enter your full name"
                value={userName || ""}
                onChange={(event) => setUserName(event.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-lg h-12 mt-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm font-semibold">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={userEmail || ""}
                onChange={(event) => setUserEmail(event.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-lg h-12 mt-2"
              />
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-blue-300 font-semibold text-sm">
                  Interview Guidelines
                </h3>
                <ul className="text-blue-200 text-xs space-y-1 leading-relaxed">
                  <li>• Ensure stable internet connection</li>
                  <li>• Test your camera and microphone</li>
                  <li>• Find a quiet, well-lit space</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Join Button */}
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
            disabled={loading || !userName || !userEmail}
            onClick={onJoinInterview}
          >
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <Loader2Icon className="w-5 h-5 animate-spin" />
              ) : (
                <Video className="w-5 h-5" />
              )}
              <span className="text-base">
                {loading ? "Joining Interview..." : "Join Interview"}
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Interview;