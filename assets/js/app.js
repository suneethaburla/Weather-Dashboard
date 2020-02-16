
    
    
    // This is our API key
    

    // Here we are building the URL we need to query the database
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&units=imperial&appid=8b58730b831d9dfe90f82c5fd73e1a99";

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

        // Transfer content to HTML
        // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humidity").text("Humidity: " + response.main.humidity);
        // $(".temp").text("Temperature (F) " + response.main.temp);

        // // Converts the temp to Kelvin with the below formula
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // $(".tempF").text("Temperature (Kelvin) " + tempF);

        // // Log the data in the console as well
        // console.log("Wind Speed: " + response.wind.speed);
        // console.log("Humidity: " + response.main.humidity);
        // console.log("Temperature (F): " + response.main.temp);
      });


