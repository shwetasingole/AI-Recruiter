"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer, User } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const StartInterview = () => {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [conversation, setConversation] = useState([]);
  const timeoutRef = useRef(null);
  const hasEndedRef = useRef(false);
  const { interview_id } = useParams();
  const router = useRouter();

  // Format timer to hh:mm:ss
  const formatTime = (secs) => {
    const hrs = String(Math.floor(secs / 3600)).padStart(2, "0");
    const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const secsStr = String(secs % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secsStr}`;
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (interviewInfo) {
      console.log("Full interviewInfo:", interviewInfo);
      startCall();
    }
  }, [interviewInfo]);

  // Log updated conversation
  useEffect(() => {
    if (conversation.length > 0) {
      console.log("🧠 Updated Conversation:", conversation);
    }
  }, [conversation]);

  const startCall = async () => {
    const questionsList = interviewInfo?.interviewDetails?.questions;

    if (!Array.isArray(questionsList)) {
      console.error(
        "❌ Questions are not in expected array format:",
        questionsList
      );
      return;
    }

    const questions = questionsList.map((item) => item?.question).join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewDetails?.jobTitle}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "11labs",
        voiceId: "burt",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an AI voice assistant conducting interviews. Ask the following questions one by one: ${questions}. Be engaging, concise, and provide helpful feedback. Wrap up at the end of the session.`,
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    vapi.stop();
    toast("Interview Ended!");
    setIsRunning(false);
    GenerateFeedback();
  };

  useEffect(() => {
    const handleMessage = (message) => {
      console.log("📩 Vapi Message:", message);

      if (
        message?.type === "conversation-update" &&
        Array.isArray(message.conversation)
      ) {
        setConversation((prev) => {
          const newLength = message.conversation.length;
          const prevLength = prev.length;

          if (newLength > prevLength) {
            const newMessages = message.conversation.slice(prevLength);
            return [...prev, ...newMessages];
          }

          return prev;
        });
      }
    };

    vapi.on("message", handleMessage);
    // Vapi event listeners
    vapi.on("call-start", () => {
      console.log("Call has started");
      toast("Call connected...");
      setSeconds(0);
      setIsRunning(true);
    });

    vapi.on("speech-start", () => {
      setActiveUser(false);
    });

    vapi.on("speech-end", () => {
      setActiveUser(true);
    });

    vapi.on("call-end", () => {
      if (hasEndedRef.current) return;
      hasEndedRef.current = true;
      console.log("Call has stopped");
      toast("Call has ended!");
      setIsRunning(false);
      GenerateFeedback();
    });

    vapi.on("transcript", (data) => {
      if (data.role === "user" || data.role === "assistant") {
        setConversation((prev) => [
          ...prev,
          {
            role: data.role,
            content: data.transcript,
          },
        ]);
      }
    });

    return () => {
      vapi.off("message", handleMessage);
    };
  }, []);

  const GenerateFeedback = async () => {
    try {
      const result = await axios.post("/api/ai-feedback", {
        conversation: conversation,
      });
      console.log("🔍 Gemini Feedback Response:", result?.data);
      const Content = result?.data;

      const { data, error } = await supabase
        .from("interview_feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: Content,
            recommendation: false,
          },
        ])
        .select();

      console.log(data);
      router.replace("/interview/" + interview_id + "/completed");
    } catch (error) {
      console.error("❌ Feedback generation error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex justify-center items-center p-5">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">AI Interview Session</h1>
            <p className="text-gray-400">Interview in progress with {interviewInfo?.userName}</p>
          </div>
          <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
            <Timer className="w-5 h-5 text-blue-400" />
            <span className="text-xl font-mono text-white">{formatTime(seconds)}</span>
          </div>
        </div>

        {/* Main Interview Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* AI Recruiter Card */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 flex flex-col items-center justify-center h-80 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-4">
                {!activeUser && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping animation-delay-75"></div>
                  </>
                )}
                <div className="relative">
                  <Image
                    src="/profile.png"
                    width={120}
                    height={120}
                    alt="AI Recruiter"
                    className="rounded-full border-4 border-gray-600 shadow-xl"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Recruiter</h3>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${!activeUser ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-sm text-gray-300">
                  {!activeUser ? 'Speaking' : 'Listening'}
                </span>
              </div>
            </div>
          </div>

          {/* User Card */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 flex flex-col items-center justify-center h-80 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-4">
                {activeUser && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping animation-delay-75"></div>
                  </>
                )}
                <div className="relative">
                  <div className="w-30 h-30 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-gray-600 shadow-xl">
                    <span className="text-3xl font-bold text-white">
                      {interviewInfo?.userName?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {interviewInfo?.userName || 'User'}
              </h3>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${activeUser ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-sm text-gray-300">
                  {activeUser ? 'Speaking' : 'Listening'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <div className="flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-700">
            <div className="p-3 bg-gray-700 rounded-full">
              <Mic className="w-6 h-6 text-gray-300" />
            </div>
            <AlertConfirmation stopInterview={stopInterview}>
              <Button className="p-3 bg-red-500 hover:bg-red-600 transition-colors rounded-full group">
                <Phone className="w-6 h-6 text-white group-hover:animate-pulse" />
              </Button>
            </AlertConfirmation>
          </div>
        </div>

        {/* Status Footer */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Interview in Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;