
    $(window).on('load', function () {
        $('.currentWeather').hide();
      });
  
      //function to convert kelvintoFahrenheit
      function k2f(K) {
        return Math.floor((K - 273.15) *1.8 +32);
    }

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        $('.currentWeather').show();
        let searchCity =$("#searchCity").val();
        getWeather(searchCity);
    });
  
    function getWeather(searchCity) {
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=8b58730b831d9dfe90f82c5fd73e1a99`;
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response) {
            console.log(response);
        $('.currentWeather').show();
        let currentDateTime = moment().format('dddd, MMMM Do YYYY');
        $('#date').text(currentDateTime);
        let cityName = response.name;
        let temp = response.main.temp.toFixed(1);
        let humidity = response.main.humidity;
        let windSpeed = response.wind.speed;
        $(".city").html("<h4>" + cityName + " Weather Details</h4>");
        $(".temp").text("Temperature (F): " + temp);
        $(".humidity").text("Humidity: " + humidity +"%");
        $(".wind").text("Wind Speed: " + windSpeed + "MPH");
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let UVQueryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=8b58730b831d9dfe90f82c5fd73e1a99&lat=${lat}&lon=${lon}`;
        $.ajax({
            url: UVQueryURL,
            method: "GET"
          })
          .then(function(uvresponse) {
            console.log(uvresponse);
            let UVIndex =uvresponse.value;
            $(".UVIndex").text("UV-Index: " + UVIndex);
          })
        });
    }

        // searchEl.addEventListener("click",function() {
        //     const searchTerm = inputEl.value;
        //     getWeather(searchTerm);
        //     searchHistory.push(searchTerm);
        //     localStorage.setItem("search",JSON.stringify(searchHistory));
        //     renderSearchHistory();
        // })

//         
//             let UVIndex = document.createElement("span");
//             UVIndex.setAttribute("class","badge badge-danger")