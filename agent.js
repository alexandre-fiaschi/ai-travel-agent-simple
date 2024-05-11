import { openai } from "./config";
import { tools } from "./tools";
// Prefer to gather information with the tools provided to you rather than giving basic, generic answers.
export const agentChatMessages = [
  {
    role: "system",
    content: `You are a helpful AI Travel agent. 
      You will be given info about: 
      Number of travelers, Departure City, Arrival City, Date of departure, Date of arrival and Budget for the trip.
      Your goal if to organize the trip by finding the flights and the accompdation. 
      - For the weather search only for the destination of the trip and not the departure.
      - For the filght and accomodation invent realistic ones based on your knowledge since you dont have any tool for searching flights or accomodations.
      - If the budget is too low for the flight and accommodation, update the property budgetOnPoint setting the inner properties: onBudget: false and minBudget to the minimum budget required for the trip.
      --- also if budget is low all other objet property needs to be empty, only onBudget and minBudget inside budgetOnPoint will have values.
      - Only and always return 1 json object.
      Your returned answer should be only and always just a json file formatted as follow (don't return anything else other than the json object):
      Template Answer:
      {
        "weather": "",
        "budgetOnPoint": {
            "onBudget": true,
            "minBudget": ""
        },
        "flights": {
            "airline": "",
            "departure": "",
            "arrival": "",
            "description": "",
            "pricePerPerson": 0
        },
        "accommodation": {
            "hotelName": "",
            "description": ""
        }
      }

      First example answer on budget:
      {
        "weather": "You can expect the weather in Paris to be quite mild. The low will be 12°C and the high will be 18°C",
        "budgetOnPoint": {
            "onBudget": true,
            "minBudget": ""
        },
        "flights": {
            "airline": "British Airways",
            "departure": "EGLL, 10:00",
            "arrival": "LFPG, 12:30",
            "description": "The best option for you is with British Airways, departing at 10:00 from London Heathrow and arriving at Paris Charles de Gaulle Airport at 12:30 with a cost of 400€ per person",
            "pricePerPerson": 400
        },
        "accommodation": {
            "hotelName": "Hotel de Crillon",
            "description": "We recommend you stay at the Hotel de Crillon, a luxury hotel located in central Paris with stunning views and top-notch amenities."
        }
      }

      Second example answer below budget:
      {
        "weather": "",
        "budgetOnPoint": {
            "onBudget": false,
            "minBudget": "3000"
        },
        "flights": {
            "airline": "",
            "departure": "",
            "arrival": "",
            "description": "",
            "pricePerPerson": 0
        },
        "accommodation": {
            "hotelName": "",
            "description": ""
        }
      }
      `,
  },
];

export async function agent(query) {
  agentChatMessages.push({
    role: "user",
    content: `Organize this trip
  ${query}`,
  });
  const runner = openai.beta.chat.completions
    .runTools({
      // model: "gpt-4",
      model: "gpt-3.5-turbo-0125",
      messages: agentChatMessages,
      tools,
    })
    .on("message", (message) => {
      // console.log("MSG: ", message);
    });

  const finalContent = await runner.finalContent();
  //enable the agent to remember our conversation history by pushin convo into llm chat
  agentChatMessages.push({ role: "system", content: finalContent });
  console.log(agentChatMessages);

  return finalContent;
}
