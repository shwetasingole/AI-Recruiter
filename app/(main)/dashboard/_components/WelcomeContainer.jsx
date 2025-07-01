"use client";
import { useUser } from "@/context/UserDetailContext";
import React from "react";
import Image from "next/image";

export default function WelcomeContainer() {
  const { user } = useUser(); // user might be null/undefined initially

  if (!user) {
    return (
      <div className="flex justify-between items-center gap-3 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 shadow-2xl w-full animate-pulse">
        <div className="flex-1">
          <div className="h-6 bg-gray-700/50 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-700/30 rounded w-64"></div>
        </div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700/50 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Mirror reflection effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-black/95 backdrop-blur-xl rounded-xl"></div>
      
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 rounded-xl"></div>
      
      {/* Border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 p-[1px]">
        <div className="w-full h-full bg-transparent rounded-xl"></div>
      </div>
      
      {/* Main content */}
      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-3 p-4 sm:p-6 lg:p-8 rounded-xl border border-white/10 shadow-2xl w-full backdrop-blur-sm">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-lg bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
            Welcome Back, {user.name}
          </h1>
          <h2 className="text-sm sm:text-base text-gray-300/90 mt-1 drop-shadow-sm leading-relaxed">
            AI-Driven Interviews, Hassle-Free Hiring
          </h2>
        </div>
        
        <div className="flex-shrink-0 self-center sm:self-auto">
          <div className="relative">
            {/* Avatar glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-md scale-110"></div>
            
            {/* Avatar container with mirror effect */}
            <div className="relative bg-gradient-to-br from-white/20 to-white/5 p-1 rounded-full backdrop-blur-sm border border-white/20">
              <Image
                src={user?.picture}
                alt="User avatar"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full object-cover shadow-lg"
              />
            </div>
            
            {/* Subtle reflection */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom reflection strip */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  );
}