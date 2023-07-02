//feature1

//let nowDate = new Date();

//let currentDate = document.querySelector("#date");
//let hours = nowDate.getHours();
//if (hours < 10) {
  //hours = `0${hours}`;
//}
//let minutes = nowDate.getMinutes();
//if (minutes < 10) {
  //minutes = `0${minutes}`;
//}
//let days = [
  //"Sunday",
  //"Monday",
  //"Tuesday",
  //"Wednesday",
  //"Thursday",
  //"Friday",
  //"Saturday",
//];

//let day = days[nowDate.getDay()];

//currentDate.innerHTML = `${day} ${hours}:${minutes}`;

// search engine homework
function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10 ) {
  hours = `0${hours}`;
} 
let minutes = date.getMinutes();
if (minutes < 10){
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
return`Last updated: ${day} ${hours}:${minutes}`;
}

function currentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${temperature}`;


  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);


  let humidityRound = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${humidityRound}%`;

  let conditionDiscription = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = `${conditionDiscription}`;

  let city = response.data.name;
  let h1 = document.querySelector("#cityName");
  h1.innerHTML = `${city} <img src="https://img.icons8.com/?size=512&id=3723&format=png" width="40px" alt="loctaion"/>`;

  let mainicon = document.querySelector("#mainicon");
  mainicon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  mainicon.setAttribute("alt", response.data.weather[0].description);
  

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

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", search);

let apiKey = "c1cf45e5f52d38632d095b6ef054c012";
let units = "metric";

