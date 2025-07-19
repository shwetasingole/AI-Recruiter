export async function POST(req) {
  try {
    const { jobTitle, jobDescription, duration, type } = await req.json();
    function getQuestionCount(duration) {
      const mins = parseInt(duration);
      if (isNaN(mins)) return 10;
      if (mins <= 15) return 5;
      if (mins <= 30) return 8;
      if (mins <= 45) return 10;
      if (mins <= 60) return 12;
      return 15;
    }

    const questionCount = getQuestionCount(duration);

    const prompt = `
You are an expert technical interviewer.  
Based on the following inputs, generate a well-structured list of high-quality interview questions:  
Job Title: ${jobTitle}  
Job Description: ${jobDescription}  
Interview Duration: ${duration} minutes 
Interview Type: ${type}  

Your task:  
Analyze the job description to identify key responsibilities, required skills, and expected experience.  
Generate a list of interview questions according to ${duration} minutes .  
Adjust the number and depth of questions to match the ${duration} minutes .  
Ensure the questions match the tone and structure of a real-life ${type} interview.  

✅ Format your response in JSON format with array list of questions.  
format: interviewQuestions=[  
{  
question:"",  
type:"${type}"  
},  
...]  

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a ${jobTitle} role.
    `.trim();

    const apiKey = process.env.GEMINI_API_KEY;
    console.log("prompt to gemini", prompt);
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    // console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));
    const rawOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // console.log("💬 Raw Gemini Output:", rawOutput);

    const cleaned = rawOutput
      .replace(/```json\s*/, "")
      .replace(/```[\s\n]*$/, "")
      .trim();

    // console.log("🧹 Cleaned Output:", cleaned);

    let questionsArray = [];

    try {
      const parsed = JSON.parse(cleaned);
      questionsArray = parsed.interviewQuestions || [];
    } catch (err) {
      console.error("❌ Failed to parse Gemini JSON:", err);
      return new Response(
        JSON.stringify({ error: "Gemini response could not be parsed." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ questions: questionsArray }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate questions" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
