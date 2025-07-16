import { Phone, Video } from "lucide-react";
import React from "react";
import Link from "next/link";
const CreateOptions = () => {
  return (
    <div className="grid grid-cols-1 gap-5">
      <Link
        href={"/dashboard/create-interview"}
        className=" shadow-md p-5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/50"
      >
        <Video className="p-3 text-blue-600 rounded-lg h-11 w-11 bg-blue-100" />
        <h2 className="font-bold mt-3 text-xl text-gray-300">Launch Interview Builder</h2>
        <p className="text-gray-400">Generate AI-powered interviews effortlessly with EchoHire</p>
      </Link>

      {/* <div className="bg-white/20 backdrop-blur-sm border border-white/50 shadow-md p-5 rounded-xl">
        <Phone className="p-3 text-blue-600 rounded-lg h-11 w-11 bg-blue-100" />
        <h2 className="font-bold mt-3 text-xl text-gray-300">Create Phone Screening Call</h2>
        <p className="text-gray-400">
          Schedule phone screeing call with candidates
        </p>
      </div> */}
    </div>
  );
};

export default CreateOptions;
