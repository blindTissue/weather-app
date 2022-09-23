import './style.css'

const BASE_URL = "https://dataservice.accuweather.com";
const API_KEY = "WS1qgH5uGfAt7285GK3hGOLDJ9cmOG08"; // terrible practice!
// You should never save API key directly in source code

const search = document.getElementById("search");
search.addEventListener("submit", getWeatherForecast);

function getWeatherForecast(event) {
  event.preventDefault();
  const city = document.getElementById("city").value.trim();
  getLocationKey(city);
}

function getLocationKey(city) {
  fetch(`${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`)
  .then((response) => response.json())
  .then((data) => {
    getCurrentCondition(data[0])
  })
  .catch((err) => console.log(err)); 

}

function getCurrentCondition(location) {
  const key = location.Key;
  // console.log(key);
  fetch(`${BASE_URL}/currentconditions/v1/${key}?apikey=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    updateUI(location, data[0])
  })
  .catch((err) => console.log(err));
  // TODO get the "current condition" based on the `location` argument!
  //  then call updateUI to update the UI!


}

function updateUI(location, forecast) {
  // TODO update the following based on `location` and `forecast` arguments!

  document.getElementById("name").innerText = location.EnglishName;
  document.getElementById("condition").innerText = forecast.WeatherText;
  document.getElementById("temperature").innerText = forecast.Temperature.Imperial.Value + "\u00B0" + 'F';
}
