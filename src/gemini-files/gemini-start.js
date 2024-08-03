import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI({ apiKey: process.env.API_KEY });

async function run() {
  const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Write a poem about Hackathons";

  const result = await model.generateContent({ prompt });
  const text = result.data;
  console.log(text);
}

run();
