"use client"
import React, { use, useEffect ,useState} from 'react'
import { useParams } from 'next/navigation';
import { supabase } from "@/services/supabaseClient";
import { useUser } from '@/context/UserDetailContext';

const InterviewDetails = () => {
    const {interview_id}=useParams();
    const { user } = useUser();
    const [interviewDetails, setInterviewDetails] = useState();

    useEffect(()=>{
        user && GetInterviewDetails();
    },[user]);
    const GetInterviewDetails=async()=>{
         const result = await supabase
              .from("Interviews")
              .select("jobTitle,created_at,duration,interview_id,interview_feedback(userEmail)")
              .eq("userEmail", user?.email)
              .eq('interview_id',interview_id)

              console.log(result.data);
              setInterviewDetails(result.data)
             
    }
  return (
    <div>InterviewDetails</div>
  )
}

export default InterviewDetails