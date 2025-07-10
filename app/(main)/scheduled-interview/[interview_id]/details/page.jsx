"use client"
import React, { use, useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { supabase } from "@/services/supabaseClient";
import { useUser } from '@/context/UserDetailContext';

const InterviewDetails = () => {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetails, setInterviewDetails] = useState();

  useEffect(() => {
    user && GetInterviewDetails();
  }, [user]);
  const GetInterviewDetails = async () => {
    const result = await supabase
      .from("Interviews")
      .select("jobTitle,created_at,duration,interview_id,interview_feedback(userName,userEmail,feedback,recommendation)")
      .eq("userEmail", user?.email)
      .eq('interview_id', interview_id)

    console.log(result.data);
    setInterviewDetails(result.data?.[0])
    console.log("Details recieved", interviewDetails);

  }
  return (
    <div className='text-white mt-7 flex flex-col gap-5'>
      <h1 className='text-2xl font-bold'>Interview Details</h1>
      {interviewDetails ? (
        <div className='bg-slate-700 p-4 rounded-lg mb-4'><p className='text-white text-lg font-medium'>Interview Id : {interviewDetails?.interview_id}</p>
          <p className='text-white text-lg font-medium mb-2'>Job Title : {interviewDetails?.jobTitle}</p>
          {interviewDetails?.interview_feedback.map((item, index) => (
  <div key={index} className="">
    <p className="text-lg font-semibold mb-2">Candidate: {item.userName} ({item.userEmail})</p>
    
    <div className="mb-2">
      <h3 className="font-bold">Ratings:</h3>
      <ul className="list-disc ml-5">
        <li>Technical Skills: {item?.feedback?.feedback?.rating?.technicalSkills}/10</li>
        <li>Communication: {item?.feedback?.feedback?.rating?.communication}/10</li>
        <li>Problem Solving: {item?.feedback?.feedback?.rating?.problemSolving}/10</li>
        <li>Experience: {item?.feedback?.feedback?.rating?.experience}/10</li>
      </ul>
    </div>

    <div className="mb-2">
      <h3 className="font-bold">Summary:</h3>
      <p className="text-sm text-gray-300">{item?.feedback?.feedback?.summary}</p>
    </div>

    <div className="mb-2">
      <h3 className="font-bold">Recommendation:</h3>
      <p>
        <span className={`font-semibold ${item?.feedback?.feedback?.recommendation === 'Yes' ? 'text-green-400' : 'text-red-400'}`}>
          {item?.feedback?.feedback?.recommendation}
        </span>
      </p>
    </div>

    <div>
      <h3 className="font-bold">Recommendation Message:</h3>
      <p className="text-sm text-gray-300">{item?.feedback?.feedback?.recommendationMsg}</p>
    </div>
  </div>
))}
</div>
      ) : <p>Loading...</p>}
    </div>
  )
}

export default InterviewDetails