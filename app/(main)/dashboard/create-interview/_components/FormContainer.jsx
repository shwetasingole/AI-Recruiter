import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const FormContainer = ({ formData, handleChange, GotoNext }) => {
  const [interviewType, setInterviewType] = useState([]);

  useEffect(() => {
    if (interviewType) {
      handleChange("type", interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
    const data = interviewType.includes(type.title);
    if (!data) {
      setInterviewType((prev) => [...prev, type.title]);
    } else {
      const result = interviewType.filter((item) => item !== type.title);
      setInterviewType(result);
    }
  };

  return (
    <div className="p-5 bg-white/20 backdrop-blur-sm border border-white/50 flex flex-col gap-5 rounded-xl text-gray-300">
      <div>
        <h2 className="text-sm font-gray-200 font-medium">Job Position</h2>
        <Input
          placeholder="e.g. Full Stack Developer"
          className="mt-2"
          value={formData.jobTitle}
          onChange={(e) => handleChange("jobTitle", e.target.value)}
        />
      </div>
      <div>
        <h2 className="text-sm font-gray-200 font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter details job description"
          className="mt-2 h-[200px]"
          value={formData.jobDescription}
          onChange={(e) => handleChange("jobDescription", e.target.value)}
        />
      </div>
      <div>
        <h2 className="text-sm font-gray-200 mb-2 font-medium">
          Interview Duration
        </h2>
        <Select onValueChange={(value) => handleChange("duration", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 Min</SelectItem>
            <SelectItem value="15">15 Min</SelectItem>
            <SelectItem value="30">30 Min</SelectItem>
            <SelectItem value="45">45 Min</SelectItem>
            <SelectItem value="60">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h2 className="text-sm font-gray-200 font-medium">Interview Type</h2>
        <div className="flex gap-3 mt-2">
          {InterviewType.map((type, index) => {
            return (
              <div
                key={index}
                onClick={() => AddInterviewType(type)}
                className={`flex items-center gap-2 bg-gray-700 text-blue-300 rounded-lg p-1 px-2 border border-gray-300  ${
                  interviewType.includes(type.title) &&
                  "bg-blue-50 text-blue-600"
                }`}
              >
                <type.icon className="w-3 h-3" />
                <span className="text-xs">{type.title}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-7 flex justify-end">
        {" "}
        <Button className="bg-blue-600 text-sm" onClick={() => GotoNext()}>
          {" "}
          Generate Questions <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default FormContainer;
