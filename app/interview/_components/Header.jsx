import React from "react";
import Image from "next/image";

const InterviewHeader = () => {
  return <div className="py-3 px-4 shadow-sm bg-white/20  border-b border-white/40">
    <Image src={'/logo-new.svg'} alt="logo" width={200} height={100} className=""/>
  </div>;
};

export default InterviewHeader;
