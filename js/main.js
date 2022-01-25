let countryInput = document.querySelector(".input-group input");
let apiKey = "e2603e0e856c449299c183041221201";
let daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let date = new Date();
countryInput.addEventListener("keyup", (e) => {

    (e.target.value.length > 2) ? displayWeather(e.target.value) : displayWeather("lon")

})

function displayWeather(countryChar) {
    let temp = ``;
    let httpRequest = new XMLHttpRequest;
    httpRequest.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${countryChar}&days=3`);
    httpRequest.send();
    httpRequest.addEventListener("readystatechange", function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            let location = JSON.parse(httpRequest.response).location;
            let current = JSON.parse(httpRequest.response).current;
            let forecast = JSON.parse(httpRequest.response).forecast;
            let forecastDay = JSON.parse(httpRequest.response).forecast.forecastday;
            temp = `      <div class="col-md-4 weather-item weather-1">
            <div class="weather-header d-flex justify-content-between align-items-center">
                <span class="day-name">${daysName[date.getDay()]}</span>
                <span class="day-date">${date.getDate() + monthName[date.getMonth()]}</span>
            </div>
            <div class="weather-info py-4">
                <p class="location mb-0">${location.name}</p>
                <div class="weather-degree today-weather d-flex justify-content-between align-items-center">
                    <p class="today-degree-txt d-inline-block me-4 mb-0 text-white">${current.temp_c}<sup>o</sup>C</p>
                    <img src="https:${current.condition.icon}" alt="">

                </div>
                <p class="status my-4 mx-0">${current.condition.text}</p>
                <span class="me-3"><i class="fas fa-umbrella"></i> ${forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                <span class="me-3"><i class="fas fa-wind"></i> ${current.wind_kph}km/h</span>
                <span class="me-3"><i class="fas fa-compass"></i> ${current.wind_dir}</span>
            </div>
        </div>`
            for (let i = 1; i < forecastDay.length; i++) {
                let forecastDate = new Date(forecastDay[i].date);
                temp +=
                    `
            <div class="col-md-4 weather-item text-center weather-${i + 1}">
                <div class="weather-header">
                    <span class="day-name">${daysName[forecastDate.getDay()]}</span>
    
                </div>
                <div class="weather-info">
                    <img src="https:${forecastDay[i].day.condition.icon}" alt="">
                    <div class="weather-degree mt-3">
                        <p class="degree-txt mb-0 text-white">${forecastDay[i].day.maxtemp_c}<sup>o</sup>C</p>
                        <span>${forecastDay[i].day.mintemp_c}<sup>o</sup></span>
    
                    </div>
                    <p class="status my-4 mx-0">${forecastDay[i].day.condition.text}</p>
    
                </div>
            </div>
            `
            }

        }
        document.getElementById("weatherRow").innerHTML = temp;

    })
}
displayWeather("lon");