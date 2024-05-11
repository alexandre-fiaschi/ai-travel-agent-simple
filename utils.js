export function updateCount(action) {
  let count = Number(travellersCount.textContent);
  if (action === "increment" && count < 10) {
    count++;
  } else if (action === "decrement" && count > 1) {
    count--;
  }
  return count;
}

export const extractJson = (text) => {
  // Regular expression to match the big object
  const regex = /{(?:[^{}]*{[^{}]*}[^{}]*)*}/gs;
  const match = regex.exec(text);

  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (error) {
      console.log("Error parsing Json");
      return null;
    }
  } else {
    console.log("No match found");
    return null;
  }
};
// const js = {
//   "weather": "You can expect the weather in Paris to be quite mild. The low will be 12°C and the high will be 18°C",
//   "budgetOnPoint": {
//       "onBudget": true,
//       "minBudget": ""
//   },
//   "flights": {
//       "airline": "British Airways",
//       "departure": "EGLL, 10:00",
//       "arrival": "LFPG, 12:30",
//       "description": "The best option for you is with British Airways, departing at 10:00 from London Heathrow and arriving at Paris Charles de Gaulle Airport at 12:30 with a cost of 400€ per person",
//       "pricePerPerson": 400
//   },
//   "accommodation": {
//       "hotelName": "Hotel de Crillon",
//       "description": "We recommend you stay at the Hotel de Crillon, a luxury hotel located in central Paris with stunning views and top-notch amenities."
//   }
// }`;

// // console.log(extractJson(js));

export function formatDate(inputDate) {
  // Convert input date string to Date object
  const date = new Date(inputDate);

  // Get day, month, and year from the Date object
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the month name from the array using the month index
  const monthName = months[monthIndex];

  // Add suffix to the day
  let dayWithSuffix;
  switch (day % 10) {
    case 1:
      dayWithSuffix = day + "st";
      break;
    case 2:
      dayWithSuffix = day + "nd";
      break;
    case 3:
      dayWithSuffix = day + "rd";
      break;
    default:
      dayWithSuffix = day + "th";
  }

  // Format the date as "dayWithSuffix monthName year"
  const formattedDate = `${dayWithSuffix} ${monthName} ${year}`;

  return formattedDate;
}

export function capitalizeCityNames(cityName) {
  // const cityArr = cityName.split(" ");
  return cityName
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.slice(1))
    .join(" ");
}

export function areInputFieldsFilled() {
  const inputFields = document.querySelectorAll(
    ".flying-from-input, .flying-to-input, .from-date-input, .to-date-input"
  );
  console.log(inputFields);
  for (const inputField of inputFields) {
    if (!inputField.value) {
      return false;
    }
  }
  return true;
}
