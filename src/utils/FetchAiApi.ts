import Groq from "groq-sdk";

export interface QuizParams {
  topic: string;
  language: string;
  numQuestions: number;
  hardness: string;
  specialRequests?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizData {
  id: string;
  topic: string;
  questions: QuizQuestion[];
  language?: string;
  hardness?: string;
  createdAt?: string;
}

const createGroqClient = () => {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) return null;
    return new Groq({ apiKey, dangerouslyAllowBrowser: true });
  } catch (err) {
    console.error("Failed to initialize Groq client:", err);
    return null;
  }
};


export const fetchQuiz = async (params: QuizParams): Promise<QuizData | null> => {
  const { topic, language, numQuestions, hardness, specialRequests } = params;

  const prompt = `You are an expert quiz generator. Generate a quiz strictly following these parameters:
    - Topic: ${topic}
    - Language: ${language}
    - Difficulty: ${hardness}
    - Number of Questions: exactly ${numQuestions}
    - Special Requests: ${specialRequests ? specialRequests : "None"}

    All questions MUST be multiple-choice with exactly four options and a single correct answer.
    You must respond ONLY with a valid JSON object. Do not include any markdown formatting, intro, or outro text.
    
    The JSON must follow this exact format:
    {
      "id": "generate_a_unique_random_string_here",
      "topic": "${topic}",
      "questions": [
        {
          "question": "The question text?",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "The exact string of the correct option"
        }
      ]
    }`;

  try {
    const groq = createGroqClient();
    if (!groq) {
      console.error("GROQ client not configured. Set VITE_GROQ_API_KEY in your environment.");
      return null;
    }

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: "Please generate my quiz now." },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7, 
    });

    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      console.error("No content in response");
      return null;
    }
    
    const quizData: QuizData = JSON.parse(content);
    return quizData;
    
  } catch (error) {
    console.error("Error generating quiz with Groq:", error);
    return null;
  }
};
