// page load that checks and then pulls from localStorage to:

const localStorageKey = "cities";
var searchedCities = [];
const maxSearchedCities = 5;

retrieveStoredCities();

console.log("Retrieved " + searchedCities.length + " cities from local storage");
console.log(searchedCities);

if (searchedCities.length > 0) {
    showCity(searchedCities[searchedCities.length - 1]);
}

function retrieveStoredCities() {
    var cities = localStorage.getItem(localStorageKey);
    if(!cities) 
        searchedCities = [];
    else 
        searchedCities = JSON.parse(cities);    
    for (var i = 0; i < searchedCities.length; i++) {
        var city = searchedCities[i];
        addSearchedCityBtn(city);
    }
}

function storeCities() {
    localStorage.setItem(localStorageKey, JSON.stringify(searchedCities));
}

function addCityToHistory(city) {
    var searchHistory = $("#searchHistory");
    while (searchedCities.length >= maxSearchedCities) {
        searchedCities.shift();
        searchHistory.find("button.history").last().remove();
    }
    searchedCities.push(city);
    storeCities();
    addSearchedCityBtn(city);
}

function addSearchedCityBtn(city) {
    var searchHistory = $("#searchHistory");
    var lastSearchedCityBtn = $("<button>").attr({"type": "button", "class": "history btn btn-outline-secondary w-100 mr-1"});
    lastSearchedCityBtn.text(city.name);
    lastSearchedCityBtn.click(function() {
        showCity(city);        
    });

    searchHistory.prepend($("<br>")).prepend(lastSearchedCityBtn);
}


$("#searchBtn").click(function() {
        var city = {};

        var cityText = $("#citySearch").val().trim();
        console.log(cityText);

        var cityURL = buildCityURL(cityText);

        $.ajax({
            url: cityURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            city.name = response.name;
            city.feels_like = response.main.feels_like;
            city.humidity = response.main.humidity;
            city.windspeed = response.wind.speed;
            city.lat = response.coord.lat;
            city.lon = response.coord.lon;

            showCurrentConditions(city);

            var uvIndex = buildIndexURL(city.lat, city.lon);
            $.ajax({
                url: uvIndex,
                method: "GET"
            }).then(function(response){

                console.log(response);

                city.uvIndex = response.value;
                showUvIndex(city);
            })
            var forecast = buildForecastURL(response.coord.lat, response.coord.lon);
            $.ajax({
                url: forecast,
                method: "GET"
            }).then(function(response) {
                console.log(response);

                city.days = [];

                for (var i =0; i < 5; i++) {

                    var cityDay = { };
                    city.days.push(cityDay);

                    var day = response.daily[i];
                    cityDay.dt = day.dt;
                    cityDay.temp = day.temp.day;
                    cityDay.weatherIcon = day.weather[0].icon;
                    cityDay.humidity = day.humidity;                   
                }
                showDays(city);
                addCityToHistory(city);
            });                   
        });
        // response.main.name
        // response.weather[0].icon
        // response.main.feels_like
        // response.main.humidity
        // response.coord.lat
        // response.coord.lon
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

function showCity(city) {
    showCurrentConditions(city);
    showUvIndex(city);
    showDays(city);
}

function showCurrentConditions(city) {
    $("#cityHeader").text(city.name);
    $("#temperature").text("Temperature: " + city.feels_like);
    $("#humidity").text("Humidity: " + city.humidity);
    $("#windSpeed").text("Wind Speed: " + city.windspeed); 
}

function showUvIndex(city) {
    $("#uvIndex").text("UV Index: " + city.uvIndex);
}

function showDays(city) {
    for (var i = 0; i < 5; i++) {
        
        var day = city.days[i];

        var date = new Date(day.dt * 1000);
        var dateDisplay = (date.getMonth() +1) + "/" + date.getDate() + "/" + date.getFullYear();

        var idNum = i + 1;

        var dayDate = $("#date" + idNum);
        dayDate.text(dateDisplay);

        var dayTemp = $("#temperature" + idNum);
        dayTemp.text((day.temp.day) + "°");

        var dayConditions = $("#conditions" + idNum);
        dayConditions.attr("src", "http://openweathermap.org/img/wn/" + day.weatherIcon + "@2x.png");

        var dayHumid = $("#humidity" + idNum);
        dayHumid.text(day.humidity + '%');
    }
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