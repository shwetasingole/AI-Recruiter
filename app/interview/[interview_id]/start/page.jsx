"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

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
    // const durationInMinutes = interviewInfo?.interviewDetails?.duration || 5;
    // const maxDurationSeconds = durationInMinutes * 60;

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

    // // Auto-end after max duration
    // timeoutRef.current = setTimeout(() => {
    //   stopInterview();
    //   toast(`⏰ Interview auto-ended after ${durationInMinutes} minutes`);
    // }, maxDurationSeconds * 1000);
  };

  const stopInterview = () => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    vapi.stop();
    toast("Interview Ended!");
    // clearTimeout(timeoutRef.current);
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
      // clearTimeout(timeoutRef.current);
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
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gapa-2 items-center">
          <Timer />
          {formatTime(seconds)}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 place-content-center mt-7">
        <div className="h-[400px] w-full flex flex-col gap-1 justify-center items-center bg-white/20 border border-gray-300 rounded-xl">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src={"/profile.png"}
              width={100}
              height={100}
              alt="ai-interviewer"
              className="rounded-full relative z-10 w-[100px] h-[100px] object-cover"
            />
          </div>
          <h2 className="text-gray-300 font-medium">AI Recruiter</h2>
        </div>

        <div className="h-[400px] w-full flex flex-col justify-center items-center gap-2 bg-white/20  border-gray-300  rounded-xl">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <h2 className="bg-blue-900 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center">
              {interviewInfo?.userName?.[0]}
            </h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex justify-center items-center gap-20 mt-7">
        <Mic className="h-10 w-10 p-3 bg-gray-300 rounded-full" />
        <AlertConfirmation stopInterview={stopInterview}>
          <Phone className="h-10 w-10 p-3 bg-red-500 text-white rounded-full" />
        </AlertConfirmation>
      </div>

      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview In Progress
      </h2>
    </div>
  );
};

export default StartInterview;
