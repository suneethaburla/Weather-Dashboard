
    
    
    $(window).on('load', function () {
      $('.currentWeather').hide();
    });

    //function to convert kelvintoFahrenheit
    function k2f(K) {
      return Math.floor((K - 273.15) *1.8 +32);
  }
    //get lat long of the current location
    function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
          console.log("Geolocation is not supported by this browser.");
      }
  }

  function showPosition(position) {
    //lat and long of current location
      let currentLocLat = position.coords.latitude;
      let currentLocLong = position.coords.longitude;
      let UVQueryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=8b58730b831d9dfe90f82c5fd73e1a99&lat=${currentLocLat}&lon=${currentLocLong}`;
      let queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocLat}&lon=${currentLocLong}&appid=8b58730b831d9dfe90f82c5fd73e1a99`;
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
          $('.currentWeather').show();
          // Log the queryURL
        let cityName = response.name;
        let temp = k2f(response.main.temp).toFixed(1);
        let humidity = response.main.humidity;
        let windSpeed = response.main.humidity;

        $(".city").html("<h4>" + cityName + " Weather Details</h4>");
        $(".temp").text("Temperature (F): " + temp);
        $(".humidity").text("Humidity: " + humidity +"%");
        $(".wind").text("Wind Speed: " + windSpeed + "MPH");
        setStorage()
        
      });
      
        $.ajax({
          url: UVQueryURL,
          method: "GET"
        })
          // We store all of the retrieved data inside of an object called "response"
          .then(function(response) {
            console.log(response);
            let UVIndex =response.value;
            $(".UVIndex").text("UV-Index: " + UVIndex);
            setStorage()
          });
          function setStorage() {
           
          let currentCity = {
            City:cityName,
            Temperature: temp,
            Humidity: humidity,
            WindSpeed: windSpeed,
            UVIndex:UVIndex
          }
          console.log("hello");
          localStorage.setItem("currentCity", JSON.stringify(currentCity));
       
  }
}
  getLocation();
  showPosition(); 
    // This is our API key
    $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    $('.currentWeather').show();
    let searchCity =$("#searchCity").val();
    console.log(searchCity);
    
   
    // Here we are building the URL we need to query the database
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=8b58730b831d9dfe90f82c5fd73e1a99`;
    let UVQueryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=8b58730b831d9dfe90f82c5fd73e1a99&lat={lat}&lon={lon}`;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);
        console.log((response.main.temp).toFixed(1));
        console.log(response.main.humidity);
        console.log(response.wind.speed);
        console.log(response.name);
     
        // Transfer content to HTML
        $(".city").html("<h4>" + response.name + " Weather Details</h4>");
        $(".temp").text("Temperature (F): " + response.main.temp.toFixed(1));
        $(".humidity").text("Humidity: " + response.main.humidity +"%");
        $(".wind").text("Wind Speed: " + response.wind.speed + "MPH");

        let currentCity = {
          city:response.name,
          temperature: response.main.temp.toFixed(1),
          humidity: response.main.humidity,
          windSpeed: response.wind.speed,
      
        };
        localStorage.setItem("currentCity", JSON.stringify(currentCity));
  
      
          // Append the newly created table data to the table row
          
          // Append the table row to the table body
          $("#searchList").append($("#citiesGroup")).append($("<li>").text(`${response.name}`));
          
       
        searchHistory(response);
      });


      });


      //pseudo code
      // when the search button is clicked do these following
      // get the search term and put it in the query URL and get the response
      // from response get the lat and long and put it in the UVqueryURL and get the UV index
      // get the temp, hum, windspeed, uv index and store to local storage under the city name
      // getstorage and get the details and display on the page
      // getweather function: get the value from the search text box and use that in the queryurl to get the weather details of that city
      //store that city weather details to the local storage
      //searchHistory function: push that city weather details to the search history
      //rendersearchHistory
      //Current conditions
      //5-Day Forecast
      //Search history
      //UV index


