import { userTripInput, extractedJsonResponse } from ".";
import { agentChatMessages } from "./agent";
import { extractJson, formatDate, capitalizeCityNames } from "./utils";

const letsBeginContainer = document.querySelector(".lets-begin-container");
const tripPlanner = document.querySelector(".trip-planner");
const tripContainer = document.querySelector(".trip-container");

export const letsBeginButton = document.querySelector(".lets-begin-button");

//Trip Planner
export const tripPlannerButton = document.querySelector(".plan-trip-button");
export const travelersIncrement = document.querySelector(
  ".travellers-increment"
);
export const travelersDecrement = document.querySelector(
  ".travellers-decrement"
);
const travellersCount = document.querySelector(".travellers-count");
const flyingFromInput = document.querySelector(".flying-from-input");
const flyingToInput = document.querySelector(".flying-to-input");
const fromDateInput = document.querySelector(".from-date-input");
const toDateInput = document.querySelector(".to-date-input");
const budgetInput = document.querySelector(".budget-input");
const loadingOverlay = document.querySelector(".loading-overlay");

//Trip Result
const tripStartDate = document.querySelector(".trip-start-date");
const tripEndDate = document.querySelector(".trip-end-date");
const tripRoute = document.querySelector(".trip-route");
const weatherDescription = document.querySelector(".weather-description");
const flightsDescription = document.querySelector(".flights-description");
const hotelDescription = document.querySelector(".hotel-description");
export const flightBookButton = document.querySelector(
  ".flights-info .book-button"
);
export const hotelBookButton = document.querySelector(
  ".hotel-info .book-button"
);

//Doms Functions
export function hideLoadingOverlay() {
  loadingOverlay.style.display = "none";
}

export function showLoadingOverlay() {
  loadingOverlay.style.display = "block";
}

export function hideTripPlanner() {
  tripPlanner.style.display = "none";
}
export function showTripPlanner() {
  tripPlanner.style.display = "flex";
}

export function travelersIncrementFunc() {
  let count = Number(travellersCount.textContent);
  if (count < 10) {
    count++;
    travellersCount.textContent = count;
  }
}
export function travelersDecrementFunc() {
  let count = Number(travellersCount.textContent);
  if (count > 1) {
    count--;
    travellersCount.textContent = count;
  }
}

export function letsBegin() {
  letsBeginContainer.style.display = "none";
  tripPlanner.style.display = "flex";
}

export function updateUserTripDetails() {
  userTripInput.paxCount = Number(travellersCount.textContent);
  userTripInput.flyFrom = flyingFromInput.value;
  userTripInput.flyTo = flyingToInput.value;
  userTripInput.fromDate = fromDateInput.value;
  userTripInput.toDate = toDateInput.value;
  userTripInput.budget = Number(budgetInput.value);
}

export async function planTrip(agent) {
  updateUserTripDetails();
  console.log("user input: ", userTripInput);
  const agentResponse = await agent(JSON.stringify(userTripInput));
  const extractedJson = extractJson(agentResponse);
  console.log(extractedJson);
  if (extractedJson.budgetOnPoint.onBudget) {
    tripPlanner.style.display = "none";
    tripContainer.style.display = "flex";
    const formattedDepartureDate = formatDate(userTripInput.fromDate);
    const formattedReturnDate = formatDate(userTripInput.toDate);
    tripStartDate.textContent = `🛫 ${formattedDepartureDate}`;
    tripEndDate.textContent = `🛬 ${formattedReturnDate}`;
    const cityFrom = capitalizeCityNames(userTripInput.flyFrom);
    const cityTo = capitalizeCityNames(userTripInput.flyTo);
    tripRoute.textContent = `${cityFrom} → ${cityTo}`;
    weatherDescription.textContent = extractedJson.weather;
    flightsDescription.textContent = extractedJson.flights.description;
    hotelDescription.textContent = extractedJson.accommodation.description;

    return extractedJson;
  } else {
    alert(
      `Budget Too Low for trip selected! Minimum budget for the trip: ${extractedJson.budgetOnPoint.minBudget}`
    );
    budgetInput.value = "";
    agentChatMessages.pop();
    agentChatMessages.pop();

    tripPlanner.style.display = "flex";
  }
}

export function bookFlights() {
  const str = `Booked the flight with ${extractedJsonResponse.flights.airline} departing from ${extractedJsonResponse.flights.departure} arriving ${extractedJsonResponse.flights.arrival}`;
  flightsDescription.textContent = str;
}

export function bookHotel() {
  const str = `Booked the hotel ${
    extractedJsonResponse.accommodation.hotelName
  } in ${capitalizeCityNames(userTripInput.flyTo)}`;
  hotelDescription.textContent = str;
}
