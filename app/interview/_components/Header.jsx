import React from "react";
import Image from "next/image";

const InterviewHeader = () => {
  return (
    <div className="py-4 px-6 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image 
            src={'/logo-new1.svg'} 
            alt="EchoHire Logo" 
            width={180} 
            height={45} 
            className="h-10 w-auto"
          />
        </div>
        
        
      </div>
    </div>
  );
};

export default InterviewHeader;