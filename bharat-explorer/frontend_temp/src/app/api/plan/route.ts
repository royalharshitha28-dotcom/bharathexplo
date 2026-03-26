import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini SDK. Wait for key at runtime.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set in the environment variables." },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { destination, duration, interests } = body;

        if (!destination) {
            return NextResponse.json({ error: "Destination is required" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
Generate a highly detailed and inspiring travel itinerary for ${duration} days to ${destination}.
The traveler wants to focus on these interests: ${interests.join(', ')}.

Provide 3 distinct activities per day (e.g. Morning, Afternoon, Evening).

CRUCIAL: Return ONLY a raw JSON object. Do NOT include markdown blocks like \`\`\`json. Return EXACTLY this structure:
{
  "plan_title": "Catchy title for the trip",
  "itinerary": [
    {
      "day": 1,
      "title": "Day 1 Title",
      "description": "Short poetic description of the day",
      "activities": [
        "Morning: [Activity detail]",
        "Afternoon: [Activity detail]",
        "Evening: [Activity detail]"
      ]
    }
  ],
  "safety_info": {
    "police": "Local emergency/police number",
    "ambulance": "Local ambulance number",
    "fire": "Local fire number",
    "tips": [
      "Tip 1",
      "Tip 2",
      "Tip 3"
    ],
    "local_advice": "One specific piece of cultural or safety advice for this destination."
  }
}
`;

        const result = await model.generateContent(prompt);
        let textResult = result.response.text();

        // Clean up markdown markers if Gemini mistakenly adds them despite instructions
        textResult = textResult.replace(/^```json/g, '').replace(/^```/g, '').replace(/```$/g, '').trim();

        const jsonItinerary = JSON.parse(textResult);

        return NextResponse.json(jsonItinerary);
    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate AI itinerary. Please try again." },
            { status: 500 }
        );
    }
}
