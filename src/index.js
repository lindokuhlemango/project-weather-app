//feature1

let nowDate = new Date();

let currentDate = document.querySelector("#date");
let hours = nowDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = nowDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[nowDate.getDay()];

currentDate.innerHTML = `${day} ${hours}:${minutes}`;

// search engine homework

function currentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${temperature}`;

  let humidityRound = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${humidityRound}%`;

  let conditionDiscription = response.data.weather[0].main;
  let description = document.querySelector("#description");
  description.innerHTML = `${conditionDiscription}`;

  let city = response.data.name;
  let h1 = document.querySelector("#cityName");
  h1.innerHTML = `${city}`;

  //console.log(`${city} ${h2}°c`);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  let units = "metric";
  let apiKey = "c1cf45e5f52d38632d095b6ef054c012";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  h1.innerHTML = `${searchInput.value}`;
  axios.get(apiUrl).then(currentTemp);
}

//let h1 = document.querySelector("h1");

// h1.innerHTML = `${city}`;
// h1.innerHTML = `${searchInput} <i class="fa-sharp fa-solid fa-location-dot"></i>`;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", search);

let apiKey = "c1cf45e5f52d38632d095b6ef054c012";
let units = "metric";

//let apiKey = "c1cf45e5f52d38632d095b6ef054c012"
//let lan = position.cords.latitude;
//let log = position.cords.longitude;
//let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
// axios.get(url).then(currentTemp)
//}
//function clickButton(event){
//event.preventDefault();
//navigator.geolocation.getCurrentPosition(currentLocation);
//}
//let input =document.querySelector("#current-button");
//input.addEventListener("submit", clickButton);
