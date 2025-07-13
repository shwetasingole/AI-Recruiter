"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Mail, Star, MessageSquare, X, CheckCircle, XCircle } from "lucide-react";

const CandidateList = () => {
  const { interview_id } = useParams();
  const { user } = useUser();

  const [interviewDetails, setInterviewDetails] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    if (user) {
      GetInterviewDetails();
    }
  }, [user]);

  const GetInterviewDetails = async () => {
    const result = await supabase
      .from("Interviews")
      .select("interview_id,interview_feedback(userName,userEmail,feedback,recommendation)")
      .eq("interview_id", interview_id);

    if (result.error) {
      console.error("Error fetching interview:", result.error.message);
      return;
    }

    const data = result.data?.[0];
    setInterviewDetails(data);
  };

  const getRecommendationIcon = (recommendation) => {
    if (recommendation?.toLowerCase().includes('hire') || recommendation?.toLowerCase().includes('recommend')) {
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
    return <XCircle className="w-4 h-4 text-red-400" />;
  };

  const getRecommendationColor = (recommendation) => {
    if (recommendation?.toLowerCase().includes('hire') || recommendation?.toLowerCase().includes('recommend')) {
      return 'text-green-400';
    }
    return 'text-red-400';
  };

  const ratings = selectedCandidate?.feedback?.feedback?.rating ;
  console.log("Ratings: ", ratings);
const score = ratings ?Object.values(ratings).reduce((total,value)=> total+value,0)/Object.values(ratings).length :0 ;

  return (
    <div className="text-white mt-8  px-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg mb-6 w-full">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-4  ">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div >
              <h1 className="text-2xl font-bold">Candidates</h1>
              <p className="text-slate-400">Interview feedback and assessments</p>
            </div>
          </div>
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2">
            <span className="text-blue-400 font-semibold text-lg">
              {interviewDetails?.interview_feedback?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Candidates List */}
      <div>
        {interviewDetails?.interview_feedback?.length > 0 ? (
          <div className="space-y-4">
            {interviewDetails.interview_feedback.map((candidate, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {candidate?.userName?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{candidate?.userName}</h3>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{candidate?.userEmail}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      console.log("Selected candidate:", candidate);
                      setSelectedCandidate(candidate);
                      setOpenModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-6 py-2 rounded-lg transition-colors"
                  >
                    
                    Check Feedback
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
            <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No candidates available</p>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {openModal && selectedCandidate && selectedCandidate?.feedback && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="border-b border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {selectedCandidate?.userName?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div className="">
                   <div className="flex items-center justify-between w-full gap-3"> 
                    <h2 className="text-xl font-bold text-white ">
                      Feedback for {selectedCandidate.userName}
                    </h2>
                    <h2 className="text-xl bg-purple-700 p-1 rounded">{score}</h2></div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{selectedCandidate?.userEmail}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setOpenModal(false);
                    setSelectedCandidate(null);
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Skills Assessment */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Skills Assessment
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Technical Skills</span>
                      <span className="text-slate-400 text-sm">
                        {selectedCandidate?.feedback?.feedback?.rating?.technicalSkills || 0}/10
                      </span>
                    </div>
                    <Progress 
                      value={selectedCandidate?.feedback?.feedback?.rating?.technicalSkills * 10} 
                      className="w-full h-2" 
                    />
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Communication</span>
                      <span className="text-slate-400 text-sm">
                        {selectedCandidate?.feedback?.feedback?.rating?.communication || 0}/10
                      </span>
                    </div>
                    <Progress 
                      value={selectedCandidate?.feedback?.feedback?.rating?.communication * 10} 
                      className="w-full h-2" 
                    />
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Problem Solving</span>
                      <span className="text-slate-400 text-sm">
                        {selectedCandidate?.feedback?.feedback?.rating?.problemSolving || 0}/10
                      </span>
                    </div>
                    <Progress 
                      value={selectedCandidate?.feedback?.feedback?.rating?.problemSolving * 10} 
                      className="w-full h-2" 
                    />
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Experience</span>
                      <span className="text-slate-400 text-sm">
                        {selectedCandidate?.feedback?.feedback?.rating?.experience || 0}/10
                      </span>
                    </div>
                    <Progress 
                      value={selectedCandidate?.feedback?.feedback?.rating?.experience * 10} 
                      className="w-full h-2" 
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Summary</h3>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-slate-300 leading-relaxed">
                    {selectedCandidate.feedback?.feedback?.summary}
                  </p>
                </div>
              </div>

              {/* Recommendation */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Recommendation</h3>
                <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    {getRecommendationIcon(selectedCandidate.feedback?.feedback?.recommendation)}
                    <span className={`font-semibold ${getRecommendationColor(selectedCandidate.feedback?.feedback?.recommendation)}`}>
                      {selectedCandidate.feedback?.feedback?.recommendation}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedCandidate.feedback?.feedback?.recommendationMsg}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-700 p-6">
              <Button
                onClick={() => {
                  setOpenModal(false);
                  setSelectedCandidate(null);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;