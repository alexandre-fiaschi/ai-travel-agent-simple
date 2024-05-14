import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

export const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
export const MAX_PAX_NUM = 10;
export const MIN_PAX_NUM = 1;
export const DOMAIN_NAME_URL = "api.openweathermap.org";

/** OpenAI config */
if (!process.env.OPENAI_API_KEY)
  throw new Error("OpenAI API key is missing or invalid.");
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
