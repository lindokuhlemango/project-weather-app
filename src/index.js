function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "Mon", "Tue", "Wed","Thu","Fri","Sat","Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
  forecastHTML = 
  forecastHTML +
    `     
   <div class="col-2">
    <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)}</div>
    <img 
    src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" 
    width="44px" 
    alt=""
    />
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-min"> ${Math.round(
      forecastDay.temp.min
    )}° </span>

    <span class="weather-forecast-temperature-max"> ${Math.round(
      forecastDay.temp.max
    )}°</span>
    </div>
  </div>    
`;
    }
  });
   forecastHTML = forecastHTML + `</div>`;
   forecastElement.innerHTML = forecastHTML;        
}

function getForecast(coordinates) {
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function currentTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let dateElement = document.querySelector("#date");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("cityName")
  let h1 = document.querySelector("#cityName");
  let mainiconElement = document.querySelector("#mainicon");
 

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature); 
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  humidityElement.innerHTML= `Humidity: ${response.data.main.humidity}%`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement = response.data.name;
  h1.innerHTML = `${cityElement} <img src="https://img.icons8.com/?size=512&id=3723&format=png" width="40px" alt="loctaion"/>`;

  mainiconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainiconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

}

function search(city) {
  let apiKey = "b8d0a6b0115d6b7d82d6c9ce2148a3b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);

}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}


function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("activeS");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click" , displayCelsiusTemperature);


search("Johannesburg");
//displayForecast();

