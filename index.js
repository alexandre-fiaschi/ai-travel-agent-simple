import { agent } from "./agent.js";
import { areInputFieldsFilled } from "./utils.js";
import {
  letsBegin,
  letsBeginButton,
  hideLoadingOverlay,
  planTrip,
  showLoadingOverlay,
  hideTripPlanner,
  showTripPlanner,
  tripPlannerButton,
  travelersIncrement,
  travelersDecrement,
  travelersIncrementFunc,
  travelersDecrementFunc,
  flightBookButton,
  hotelBookButton,
  bookHotel,
  bookFlights,
} from "./dom.js";

export let extractedJsonResponse;
export const userTripInput = {};

letsBeginButton.addEventListener("click", letsBegin);

tripPlannerButton.addEventListener("click", async function (event) {
  showLoadingOverlay();
  hideTripPlanner();
  if (!areInputFieldsFilled()) {
    alert("Please fill out all the required input fields.");
    event.preventDefault();
    hideLoadingOverlay();
    showTripPlanner();
    return;
  }
  extractedJsonResponse = await planTrip(agent);
  hideLoadingOverlay();
});

travelersIncrement.addEventListener("click", function (event) {
  travelersIncrementFunc();
});

travelersDecrement.addEventListener("click", function (event) {
  travelersDecrementFunc();
});

flightBookButton.addEventListener("click", function (event) {
  bookFlights();
});
hotelBookButton.addEventListener("click", function (event) {
  bookHotel();
});
