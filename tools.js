import { WEATHER_API_KEY } from "./config.js";

export async function getCurrentWeather({ cityName }) {
  const geoRes = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${WEATHER_API_KEY}`
  );
  const resJson = await geoRes.json();
  const { lat, lon } = resJson[0];

  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
  );
  const weatherJson = await weatherRes.json();
  const {
    main: temps,
    weather: [weather],
    wind,
    name,
    sys: { country },
  } = weatherJson;
  return JSON.stringify({ name, country, temperatures: temps, weather, wind });
}

export const tools = [
  {
    type: "function",
    function: {
      function: getCurrentWeather,
      parse: JSON.parse,
      parameters: {
        type: "object",
        properties: {
          cityName: {
            type: "string",
            description: "The city from where to get the weather",
          },
        },
        required: ["cityName"],
      },
    },
  },
];
