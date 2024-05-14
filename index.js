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
  travellersInput,
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

travellersInput.addEventListener("click", function (event) {
  //refactored with event delegation
  const btn = event.target.closest(".btn__inline");
  if (!btn) return;
  if (btn.classList.value.includes("increment")) travelersIncrementFunc();
  else travelersDecrementFunc();
});

flightBookButton.addEventListener("click", function (event) {
  bookFlights();
});
hotelBookButton.addEventListener("click", function (event) {
  bookHotel();
});
