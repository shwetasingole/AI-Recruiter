import { Button } from "@/components/ui/button";
import React from "react";

const QuestionListContainer = ({questions}) => {
  return (
    <div>
      <h2 className="font-bold mb-3">Generated Questions</h2>
      <div className=" gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {questions.map((q, index) => {
          return (
            <div
              key={index}
              className=" border border-gray-300 bg-white/20 backdrop-blur-sm text-gray-300 p-5 rounded"
            >
              <h1 className="text-sm font-bold">{q.question}</h1>
              <p className="text-xs  mt-2 text-blue-300 font-semibold">{q.type}</p>
            </div>
          );
        })}

      </div>
      
    </div>
  );
};

export default QuestionListContainer;
