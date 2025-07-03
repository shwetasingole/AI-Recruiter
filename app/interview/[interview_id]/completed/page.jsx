"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const InterviewCompletion = () => {
  const router=useRouter();
  return (
    <div className="flex flex-col gap-5 items-center justify-center mt-5 h-screen">
      <h2 className="text-gray-300 font-bold text-2xl">Your Interview has been completed successfully!!</h2>
      <Image src={"/Untitled design (10).png"} width={1000} height={500} alt="interview-complete-image"/>
      <Button className="bg-blue-600" onClick={()=>router.push('/dashboard')}>Go to Dashboard</Button>
    </div>
  );
};

export default InterviewCompletion;
