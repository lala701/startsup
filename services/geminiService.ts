
import { GoogleGenAI, Type } from "@google/genai";
import type { Caption } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the key is provided in the environment.
  console.warn("Gemini API key not found in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const captionSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      caption: {
        type: Type.STRING,
        description: 'The catchy, engaging social media caption.',
      },
      hashtags: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
          description: 'A relevant hashtag without the # symbol.'
        },
        description: 'A list of 3 to 5 relevant and trending hashtags.',
      },
    },
    required: ['caption', 'hashtags'],
  },
};

export const generateCaptions = async (postDescription: string): Promise<Caption[]> => {
  const prompt = `
    You are an expert social media manager specializing in creating viral content. 
    Based on the following post description, generate exactly 3 distinct and catchy captions.
    For each caption, also provide a list of relevant and trending hashtags.

    Post Description: "${postDescription}"

    Your response must be a valid JSON array matching the provided schema.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: captionSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedCaptions = JSON.parse(jsonString);

    // Basic validation to ensure the response is an array
    if (!Array.isArray(parsedCaptions)) {
        throw new Error("API did not return an array of captions.");
    }

    return parsedCaptions as Caption[];
  } catch (error) {
    console.error("Error generating captions with Gemini:", error);
    throw new Error("Failed to generate captions from AI service.");
  }
};
