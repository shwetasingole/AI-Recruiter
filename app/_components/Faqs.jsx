import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Faqs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 rounded-2xl backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Everything you need to know about iEchoHire
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem 
            value="item-1" 
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5"
          >
            <AccordionTrigger className="text-white hover:text-gray-200 px-6 py-4 text-lg font-medium hover:no-underline">
              What is iEchoHire?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 px-6 pb-4 pt-2 text-base leading-relaxed">
              iEchoHire is an AI-powered virtual interviewer that streamlines and enhances the interview process for both recruiters and candidates.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value="item-2" 
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5"
          >
            <AccordionTrigger className="text-white hover:text-gray-200 px-6 py-4 text-lg font-medium hover:no-underline">
              How does voice-based interaction work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 px-6 pb-4 pt-2 text-base leading-relaxed">
              The system uses real-time speech recognition and natural language processing to conduct and analyze interviews in a conversational format.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value="item-3" 
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5"
          >
            <AccordionTrigger className="text-white hover:text-gray-200 px-6 py-4 text-lg font-medium hover:no-underline">
              Is iEchoHire suitable for all job roles?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 px-6 pb-4 pt-2 text-base leading-relaxed">
              Yes, it can generate contextual questions for a variety of job roles by understanding the candidate's profile and job description.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value="item-4" 
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5"
          >
            <AccordionTrigger className="text-white hover:text-gray-200 px-6 py-4 text-lg font-medium hover:no-underline">
              Does it provide interview feedback?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 px-6 pb-4 pt-2 text-base leading-relaxed">
              Absolutely. After each session, candidates receive performance insights, sentiment analysis, and suggestions for improvement.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value="item-5" 
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5"
          >
            <AccordionTrigger className="text-white hover:text-gray-200 px-6 py-4 text-lg font-medium hover:no-underline">
              Is my data secure with iEchoHire?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 px-6 pb-4 pt-2 text-base leading-relaxed">
              Yes, all conversations and user data are encrypted and handled with strict confidentiality.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Faqs;