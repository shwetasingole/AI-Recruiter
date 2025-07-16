import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-black via-black to-black border-t border-white/10">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Image src="/logo-home.svg" width={150} height={100} alt="EchoHire Logo" />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Bringing clarity to interview preparation through voice-based <br/>AI — practice or assess, your way.
            </p>
            <div className="flex space-x-4">
              {/* <Link href="#" className="group">
                <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10">
                  <Twitter className="w-5 h-5 text-white group-hover:text-gray-200" />
                </div>
              </Link> */}
              <Link href="#" className="group">
                <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10">
                  <Linkedin className="w-5 h-5 text-white group-hover:text-gray-200" />
                </div>
              </Link>
              <Link href="#" className="group">
                <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10">
                  <Github className="w-5 h-5 text-white group-hover:text-gray-200" />
                </div>
              </Link>
            </div>
          </div>

          

          {/* Solutions
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Solutions</h3>
            <nav className="space-y-3">
              {['AI Interviews', 'Voice Analysis', 'Performance Insights'].map((link) => (
                <Link key={link} href="#" className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                </Link>
              ))}
            </nav>
          </div>
*/}
        </div> 

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2025 EchoHire Shweta Ingole. All rights reserved.
          </div>
          
        </div>

        {/* Subtle gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;