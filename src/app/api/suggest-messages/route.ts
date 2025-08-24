/* eslint-disable @typescript-eslint/no-unused-vars */
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;
export const runtime = "edge";

export async function POST(req: Request) {
  const prompt =
    "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  try {
    const result = streamText({
      model: openai("gpt-4o"),
      system:
        "You are a helpful assistant that generates fun, safe, and engaging questions.",
      prompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("AI error:", err);

    // fallback response (static suggestions)
    const fallback =
      "What's your favorite book?||If you could visit any country, where would you go?||What's a skill you want to learn?";
    return Response.json({ completion: fallback }, { status: 200 });
  }
}
