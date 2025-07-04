"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";

const Login = () => {
  const signInWithGoogle = async () => {
    // google lgojn
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://ai-recruiter-1i3x.vercel.app/auth/callback`,
      },
    });
    if (error) {
      console.log("Error", error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <Image src="/logo-new1.svg" alt="logo" width={180} height={100} />
      </div>
      <div className="mt-6 text-center flex flex-col items-center gap-3 rounded-2xl shadow p-5">
        <Image
          src="/Hiring 1.png"
          alt="Hiring illustration"
          width={350}
          height={400}
        />
        <h2 className="text-2xl font-bold">Welcome to EchoHire</h2>
        <p className="text-gray-500">Sign in with Google Auth</p>
        <Button className="" onClick={signInWithGoogle}>
          Google Sign in
        </Button>
      </div>
    </div>
  );
};

export default Login;
