let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday",
];
let today = days[now.getDay()];

const zeroPad = (num, places) => String(num).padStart(places, "0");
let hour = zeroPad(now.getHours(), 2);
let minutes = zeroPad(now.getMinutes(), 2);

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = today;
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}`;
let city = document.querySelector("h1");

function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("h3").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(cityInput) {
  let apiKey = "a9f48d5f7ecc57bc3785d4771e2e05af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}
let form = document.querySelector("#form-search");
form.addEventListener("submit", citySearch);

let temperature = document.querySelector(".temp");

function searchLocation(position) {
  let apiKey = "a9f48d5f7ecc57bc3785d4771e2e05af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function tempInC(event) {
  event.preventDefault();

  temperature.innerHTML = "18";
}
let celsius = document.querySelector("#c");
celsius.addEventListener("click", tempInC);

function tempInF(event) {
  event.preventDefault();

  temperature.innerHTML = "34";
}
let fahrenheit = document.querySelector("#f");
fahrenheit.addEventListener("click", tempInF);
