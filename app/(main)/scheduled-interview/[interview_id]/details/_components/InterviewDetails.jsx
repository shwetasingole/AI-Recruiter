"use client"
import React, { use, useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { supabase } from "@/services/supabaseClient";
import { useUser } from '@/context/UserDetailContext';
import { Calendar, Clock, Briefcase, FileText, MessageSquare } from 'lucide-react';

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
      .select("jobTitle,jobDescription,type,questions, created_at,duration,interview_id,interview_feedback(userName,userEmail,feedback,recommendation)")
      .eq("userEmail", user?.email)
      .eq('interview_id', interview_id)
    console.log(result.data);
    setInterviewDetails(result.data?.[0])
    console.log("Details recieved", interviewDetails);
  }

  const typeArray =interviewDetails?.type ? JSON.parse(interviewDetails?.type) :[];
  return (
    <div className='text-white mt-8 max-w-6xl mx-auto px-4'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-300'>
          Interview Details
        </h1>
      </div>

      {interviewDetails ? (
        <div className='bg-white/20  rounded-xl p-6 '>
          {/* Header Section */}
          <div className=' pb-6 mb-6'>
            <h2 className='text-2xl font-bold text-white mb-4 flex items-center gap-2'>
              <Briefcase className='w-6 h-6 text-blue-400' />
              {interviewDetails?.jobTitle}
            </h2>
            
            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='bg-white/10 rounded-lg p-4 border border-white/30'>
                <div className='flex items-center gap-2 text-blue-500'>
                  <Clock className='w-4 h-4' />
                  <span className='text-sm font-medium'>Duration</span>
                </div>
                <p className='text-lg font-semibold mt-1'>{interviewDetails?.duration} minutes</p>
              </div>
              
              <div className='bg-white/10 rounded-lg p-4 border border-white/30'>
                <div className='flex items-center gap-2 text-green-500'>
                  <Calendar className='w-4 h-4' />
                  <span className='text-sm font-medium'>Date</span>
                </div>
                <p className='text-lg font-semibold mt-1'>{interviewDetails?.created_at?.split("T")[0]}</p>
              </div>
              
              <div className='bg-white/10 rounded-lg p-4 border border-white/30 flex flex-col'>
                <div className='flex items-center gap-2 text-purple-500 w-full'>
                  <MessageSquare className='w-4 h-4' />
                  <span className='text-sm font-medium'>Type</span>
                </div>
                <p className=' font-semibold mt-1 capitalize'>{typeArray.join(",")}</p>
              </div>
            </div>
          </div>

          {/* Job Description Section */}
          <div className='mb-8'>
            <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
              <FileText className='w-5 h-5 text-blue-400' />
              Job Description
            </h3>
            <div className='bg-slate-700/30 rounded-lg p-4 border border-slate-600'>
              <p className='text-slate-300 leading-relaxed'>{interviewDetails?.jobDescription}</p>
            </div>
          </div>

          {/* Interview Questions Section */}
          <div>
            <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
              <MessageSquare className='w-5 h-5 text-green-400' />
              Interview Questions
            </h3>
            
            {interviewDetails?.questions?.length > 0 ? (
              <div className='bg-slate-700/30 rounded-lg p-4 border border-slate-600'>
                <ul className='space-y-3'>
                  {interviewDetails?.questions?.map((question, index) => (
                    <li key={index} className='flex items-start gap-3'>
                      <span className='bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5'>
                        {index + 1}
                      </span>
                      <p className='text-slate-300 leading-relaxed'>{question.question}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className='bg-slate-700/30 rounded-lg p-4 border border-slate-600 text-center'>
                <p className='text-slate-400 italic'>No questions available</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-64'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4'></div>
            <p className='text-slate-400 text-lg'>Loading interview details...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default InterviewDetails