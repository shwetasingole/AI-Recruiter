"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";

const Login = () => {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      // options: {
      //   redirectTo: `https://ai-recruiter-1i3x.vercel.app/auth/callback`,
      // },
    });
    if (error) {
      console.log("Error", error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-gray-300 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Dark blurred background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-black/95 backdrop-blur-xl"></div>

        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 rounded-xl"></div>

        {/* Border glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 p-[1px]">
          <div className="w-full h-full bg-transparent rounded-xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen my-10">
        <div className="bg-white/20 backdrop-blur-sm p-10 rounded-lg border border-white">
          <div>
            <Image src="/logo-new1.svg" alt="logo" width={180} height={100} />
          </div>
          <div className="mt-6 text-center flex flex-col items-center gap-3 p-5">
            <Image
              src="/Hiring 1 (1).png"
              alt="Hiring illustration"
              width={350}
              height={400}
            />
            <h2 className="text-3xl font-bold text-white">Welcome to EchoHire</h2>
            <p className="text-gray-300">Sign in with Google Auth</p>
            <Button className="relative mt-2" onClick={signInWithGoogle}>
              Google Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
