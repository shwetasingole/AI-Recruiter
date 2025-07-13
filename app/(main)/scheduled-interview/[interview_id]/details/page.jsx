import React from 'react';
import InterviewDetails from './_components/InterviewDetails';
import CandidateList from './_components/CandidateList';

const InterviewDetailsComplete = () => {

  return (
    <div className='flex flex-col gap-5 relative'>
      <InterviewDetails />
      <CandidateList/>
      </div>
     
   )
}

export default InterviewDetailsComplete