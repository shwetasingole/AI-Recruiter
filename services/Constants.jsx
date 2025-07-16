import {
  BriefcaseBusinessIcon,
  Calendar,
  Code2Icon,
  LayoutDashboard,
  List,
  Puzzle,
  Settings,
  User2Icon,
  WalletCards,
} from "lucide-react";

export const SideBarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Scheduled Interview",
    icon: Calendar,
    path: "/scheduled-interview",
  },
  {
    name: "All Interview",
    icon: List,
    path: "/all-interview",
  },
  // {
  //   name: "Billing",
  //   icon: WalletCards,
  //   path: "/billing",
  // },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
];

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.  
Based on the following inputs, generate a well-structured list of high-quality interview questions:  
Job Title: {{jobTitle}}  
Job Description: {{jobDescription}}  
Interview Duration: {{duration}}  
Interview Type: {{type}}  
  
Your task:  
Analyze the job description to identify key responsibilities, required skills, and expected experience.  
Generate a list of interview questions depends on interview duration.  
Adjust the number and depth of questions to match the interview duration.  
Ensure the questions match the tone and structure of a real-life {{type}} interview.  
✅ Format your response in JSON format with array list of questions.  
format: interviewQuestions=[  
{  
question:"",  
type:"Technical/Behavioral/Experience/Problem Solving/Leasership"  
},  
...  
]  
  
🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`;


export const FEEDBACK_PROMPT = `{{conversation}}
Based on this interview conversation between the assistant and the user,  
provide structured feedback for the user. Rate the user out of 10 in the following areas:  
- Technical Skills  
- Communication  
- Problem Solving  
- Experience  

Also, summarize the interview in **3 lines**, and provide **one final line** that clearly states  
whether the user is recommended for hire, along with a short **recommendation message**.

Give your response strictly in the following **JSON** format:

{
  "feedback": {
    "rating": {
      "technicalSkills": 0,
      "communication": 0,
      "problemSolving": 0,
      "experience": 0
    },
    "summary": "<3 line summary here>",
    "recommendation": "<yes/maybe/no>",
    "recommendationMsg": "<1 line recommendation message>"
  }
}
`;
