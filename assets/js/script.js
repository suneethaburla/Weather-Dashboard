
$(window).on('load', function () {
    $('.currentWeather').hide();
});

//function to convert kelvintoFahrenheit
function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    $('.currentWeather').show();
    let searchCity = $("#searchCity").val();
    getWeather(searchCity);
    searchHistory.push(searchCity);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
});

function getWeather(searchCity) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=8b58730b831d9dfe90f82c5fd73e1a99`;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            $('.currentWeather').show();
            let currentDate = moment().format('dddd, MMMM Do YYYY');
            $('#date').text(currentDate);
            let cityName = response.name;
            let temp = response.main.temp.toFixed(1);
            let humidity = response.main.humidity;
            let windSpeed = response.wind.speed;
            let icon =`<img src = "https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt="${response.weather[0].description}" width="5%"></img>`
            $(".city").html("<h4>" + cityName + " Weather Details</h4>");
            $(".temp").text("Temperature (F): " + temp);
            $(".humidity").text("Humidity: " + humidity + "%");
            $(".wind").text("Wind Speed: " + windSpeed + "MPH");
            $("#icon").html(icon);
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let UVQueryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=8b58730b831d9dfe90f82c5fd73e1a99&lat=${lat}&lon=${lon}`;
            $.ajax({
                url: UVQueryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                    let UVIndex = response.value;
                    $(".UVIndex").text(UVIndex);
                });

            let cityID = response.id;
            let forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=8b58730b831d9dfe90f82c5fd73e1a99`;

            $.ajax({
                url: forecastQueryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                    let output = '';
                    for (let i = 0; i < 5; i++) {
                        let forecastIndex = i * 8 + 4;
                        let futureDay = new moment().add(i + 1, 'day').format('L');
                        output += `
            <div class = "col-2">
              <div class = "future">
                    <p>${futureDay}</p>
                    <img src = "https://openweathermap.org/img/wn/${response.list[forecastIndex].weather[0].icon}@2x.png" alt="${response.list[forecastIndex].weather[0].description}" width="100%"></img>
                    <p>Temp (F):${k2f(response.list[forecastIndex].main.temp)} </p>
                    <p>Humidity:${response.list[forecastIndex].main.humidity} % </p>         
                    </div>
             </div>
              `;
                    }
                    $('#forecast').html(output);
                });

        });
}

$("#clearHistory").on("click", function (event) {
    searchHistory = [];
    localStorage.clear()
    renderSearchHistory();
});

function renderSearchHistory() {

    let output = '';
    for (let i = 0; i < searchHistory.length; i++) {
        let historyItem = $("<input>");
        output += `
       <input type="button" id=city${i} onclick="${getWeather(searchHistory[i])}" readonly class="form-control" id="staticEmail" value=${searchHistory[i]}></input>

`;
    }
    $('#historyCity').html(output);
}

// $("#historyCity").on("click", function (event) {
//     console.log($(this));
//     console.log($(this)[0].children[0]);
//     console.log($(this)[0].children[0].val());
//     // getWeather(this.val())
