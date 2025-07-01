"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_components/FormContainer";
import QuestionsList from "./_components/QuestionsList";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";

const CreateInterview = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [interviewId, setInterviewId] = useState();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    duration: "",
    type: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const onGoToNext = () => {
    const missingFields = [];

    if (!formData?.jobTitle) missingFields.push("Job Title");
    if (!formData?.jobDescription) missingFields.push("Job Description");
    if (!formData?.duration) missingFields.push("Interview Duration");
    if (!formData?.type || formData.type.length === 0)
      missingFields.push("Interview Type");

    if (missingFields.length > 0) {
      toast(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }
    console.log("VALIDATING: ", formData);

    setStep(step + 1);
  };

  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
    setStep(step + 1);
  };

  return (
    <div className="mt-10 container mx-auto  max-w-4xl px-10 lg:px-40 w-full">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer text-gray-300" />
        <h2 className="font-bold text-2xl text-gray-300">Create New Interview</h2>
      </div>
      <Progress value={step * 33} className="my-5 " />
      {step == 1 ? (
        <FormContainer
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          GotoNext={() => onGoToNext()}
        />
      ) : step == 2 ? (
        <QuestionsList formData={formData} onCreateLink={onCreateLink} />
      ) : step == 3 ? (
        <InterviewLink interviewId={interviewId} formData={formData} />
      ) : null}
    </div>
  );
};

export default CreateInterview;
