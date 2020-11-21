// page load that checks and then pulls from localStorage to:




$("#searchBtn").click(function() {
        var city = $("#citySearch").val().trim();
        console.log(city);

        var cityURL = buildCityURL(city);

        $.ajax({
            url: cityURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $("#cityHeader").text(response.name);
            $("#temperature").text("Temperature: " + response.main.feels_like);
            $("#humidity").text("Humidity: " + response.main.humidity);
            $("#windSpeed").text("Wind Speed: " + response.wind.speed);
            var uvIndex = buildIndexURL(response.coord.lat, response.coord.lon);
            $.ajax({
                url: uvIndex,
                method: "GET"
            }).then(function(response){
                console.log(response);
                $("#uvIndex").text("UV Index: " + response.value);
            })
            var forecast = buildForecastURL(response.coord.lat, response.coord.lon);
            $.ajax({
                url: forecast,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                for (var i =0; i < 5; i++) {
                    var date = response.daily[i].dt;
                }
            });                   
        });
        // response.main.name
        // response.weather[0].icon
        // response.main.feels_like
        // response.main.humidity
        // response.coord.lat
        // response.coord.lon

        // var dateDisplay = daysDate
        //     .getMonth() + '/' + daysDate
        //     .getDate() + '/' + daysDate
        //     .getFullYear();

});

var apiKey = "849dd85b1de6d21e0d35bf2a08ccebea";

function buildCityURL(city) {
    //api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    
    return queryURL + city + "&units=imperial&appid=" + apiKey;  
};

function buildIndexURL(lat, lon) {
    //http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
    var indexURL = "http://api.openweathermap.org/data/2.5/uvi?";
    
    return indexURL + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;   
};

function buildForecastURL(lat, lon) {
    // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?"

    return forecastURL + "lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
}
// $("#searchBtn").on("click", function() {
//     // This line allows us to take advantage of the HTML "submit" property
//     // This way we can hit enter on the keyboard and it registers the search
//     // (in addition to clicks). Prevents the page from reloading on form submit.
//     response.preventDefault();
  
//     // Empty the region associated with the articles
//     clear();
  
//     // Build the query URL for the ajax request to the NYT API
//     var queryURL = buildQueryURL();
  
//     // Make the AJAX request to the API - GETs the JSON data at the queryURL.
//     // The data then gets passed as an argument to the updatePage function
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {
//         console.log(queryURL);
//   });
// });

//     Display buttons of the five most recent searches
//     Display the forecast/weather data for the most recently searched city 


// onClick event for the search field button that 
//     -generates the API query and makes an ajax call to the openWeather API to
//     -pull the current weather, and 
//     -makes an ajax call to the openWeather forecast API to
//     -pull the five day forecast for the searched city

//     function will 
//         -display the current weather conditions for the searched city
//         -dynamically generate the five day forecast cards
//         -dynamically create and update the saved searches buttons in the left column
//         -dynamically style the weather conditions data based on weather conditions
//         -store search info to local storage

// another onclick event for the saved search buttons that repeats the same info as above....
// api.openweathermap.org/data/2.5/weather?q=London&appid={API key}