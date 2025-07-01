import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Loader2, Loader2Icon } from "lucide-react";
import QuestionListContainer from "./QuestionListContainer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/context/UserDetailContext";
import { v4 as uuidv4 } from "uuid";
const QuestionsList = ({ formData , onCreateLink }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/ai-model", 
        formData,
      );
      console.log(response.data);
      setQuestions(response.data.questions || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching the data", error);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        { ...formData, questions, userEmail: user?.email, interview_id },
      ])
      .select();
    setSaveLoading(false);

    onCreateLink( interview_id );
  };
  return (
    <div>
      {loading ? (
        <div className="p-5  bg-white/20 backdrop-blur-sm border border-blue-300 rounded-xl  flex gap-5">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-semibold text-lg text-gray-300">
              Generating Interview Questions
            </h2>
            <p className="mt-2 text-blue-400">
              Our AI is crafting personalized questions bases on your job
              position
            </p>
          </div>
        </div>
      ) : (
        <QuestionListContainer questions={questions} />
      )}
      <div className="flex justify-end mt-10">
        <Button onClick={() => onFinish()} disabled={saveLoading} className="bg-blue-600">
          {saveLoading && <Loader2 className="animate-spin" />}Create Interview
          Link & Finish
        </Button>
      </div>
    </div>
  );
};

export default QuestionsList;
