import { GoogleGenAI, Type } from "@google/genai";
import type { Caption } from "../types";

// FIX: Per coding guidelines, the API key must be obtained exclusively from
// process.env.API_KEY and used directly during client initialization.
// The availability of the key is a hard requirement and should not be checked in the code.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

export const generateCaptions = async (postDescription: string, templateName: string): Promise<Caption[]> => {
  const prompt = `
    You are an expert social media manager specializing in creating viral content. 
    A user has selected the "${templateName}" template for their post.
    Based on the following post description, generate exactly 3 distinct and catchy captions.
    Each caption must be tailored to the tone and purpose of a "${templateName}" post.
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
