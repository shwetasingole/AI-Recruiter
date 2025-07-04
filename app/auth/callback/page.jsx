"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        router.push("/dashboard");
      } else {
        console.error("No session found.");
        router.push("/");
      }
    };
    getSession();
  }, []);

  return <p className="text-center p-10">Redirecting after login...</p>;
}
