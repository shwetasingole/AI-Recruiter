import { Mic, Brain, BarChart3, MessageCircle } from 'lucide-react';
import React from 'react';
import GlareHover from '@/components/ui/animated/Glarehover';

const Cards = () => {
  return (
    <div className=" p-6  text-white">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent leading-tight">
            Features of EchoHire
          </h2>
          <p className="text-gray-400 text-lg font-light">
            All the powerful features that make EchoHire the future of interviewing
          </p>
        </div>

        {/* Centered grid wrapper */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Real-time Voice Interaction */}
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
            >
              <div className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-8  hover:shadow-xl transition-all duration-300 hover:scale-105 ">
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mic className="text-white" size={24} />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-300 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  Real-time Voice Interaction
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Experience natural conversations with intelligent voice-based communication that simulates authentic interview scenarios.
                </p>
              </div>
            </GlareHover>

            {/* Smart Question Generation */}
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
            >
              <div className="bg-white/5 hover:bg-white/10 backdrop-blur-smrounded-2xl p-8  hover:shadow-xl transition-all duration-300 hover:scale-105 ">
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Brain className="text-white" size={24} />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-300 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  Smart Question Generation
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  AI generates contextual interview questions tailored to specific roles and candidate profiles for comprehensive evaluation.
                </p>
              </div>
            </GlareHover>

            {/* Response Analysis */}
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
            >
              <div className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-8  hover:shadow-xl transition-all duration-300 hover:scale-105 ">
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="text-white" size={24} />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-300 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  Response Analysis
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Automated analysis provides detailed insights and feedback on candidate responses with comprehensive performance metrics.
                </p>
              </div>
            </GlareHover>

            {/* Interview Feedback */}
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8  hover:shadow-xl transition-all duration-300 hover:scale-105 ">
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-300 mb-3 group-hover:text-cyan-500 transition-colors duration-300">
                  Interview Feedback
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Get instant feedback summaries with sentiment insights and improvement suggestions.
                </p>
              </div>
            </GlareHover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
