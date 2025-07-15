"use client";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ShapeBlur from "@/components/ui/animated/ShapeBlur";
import { Car } from "lucide-react";
import Cards from "./_components/Cards";
import Faqs from "./_components/Faqs";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

export default function Home() {
  const [pixelRatio, setPixelRatio] = useState(1);
  const router =useRouter();

  const handleDashboardRedirect = async () => {
    const { data } = await supabase.auth.getSession();
    if (data?.session) {
      router.push("/dashboard");
    } else {
      console.error("No session found.");
      router.push("/auth");
    }
  };
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPixelRatio(window.devicePixelRatio || 1);
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-black via-gray-800 to-black min-h-screen flex flex-col justify-between text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 md:p-8 relative z-20">
        <div className="transform hover:scale-105 transition-transform duration-300 ease-out">
          <Image src={"/logo-home.svg"} width={150} height={100} alt="Logo" />
        </div>
      
          <Button  onClick={handleDashboardRedirect} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10">
            Dashboard
          </Button>
        
      </div>

      {/* Animated background section */}
      <div className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* ShapeBlur canvas - behind text */}
        <div className="absolute inset-0 z-0">
          <ShapeBlur
            variation={0}
            pixelRatioProp={pixelRatio}
            shapeSize={1.5}
            roundness={0.5}
            borderSize={0.05}
            circleSize={0.5}
            circleEdge={1}
          />
        </div>
        
        {/* White background overlay to make text readable */}
        <div className="absolute inset-0  backdrop-blur-sm z-5"></div>
        
        {/* Text on top */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-white/80 to-gray-800 bg-clip-text text-transparent leading-tight transition-all duration-300 ">
             EchoHire: The Future of Interviewing, Today
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-light transition-colors duration-300 hover:text-gray-300">
            Voice-powered AI interviews that deliver <br/>smarter hiring decisions — faster, fairer, and more human.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-white/20 text-white hover:bg-gray-800 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Get Started
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      

      <div>
        <Cards />
      </div>
<div>
  <Faqs />
</div>
<div>
  <Footer />
</div>
      
    </div>
  );
}