# Bootcamp Homework 06 Server-Side APIs: Weather Dashboard

## My Weather Dashboard Generator

This is an assignment to create a weather dashboard that retrieves data from the `OpenWeather API`.  The dashboard should run in the browser and feature dynamically updated HTML and CSS.  Users should be able to search by city to see both the current weather conditions along with a 5-day forecast.  When searched, cities are then added to the search history.  Cities in search history can be selected to again display the current weather conditions and 5-day forecast for the city.

### Homework Deliverables and Codebase Updates

* Created `index.html` and `script.js` files
* Generated a responsive UI utilizing the Bootstrap CSS Framework
* Added `<script>` elements to the html to link `jQuery` CDN and `script.js` file
* Created `onclick` event to call weather data when searching for a City
* Called to three separate `OpenWeather APIs` to retrieve the expected data:
    * [Current Weather Data](https://openweathermap.org/current)
    * [Ultraviolet Index](https://openweathermap.org/api/uvi)
    * [One Call API](https://openweathermap.org/api/one-call-api)
* Dynamically populated `index.html` with the data points returned from the API calls
* Stored searched cities history to `localStorage`
* Retrieved 5 most recent searched cities history from `localStorage` and displayed results as buttons that will retrieve weather info on click
* Created a README.md file to describe and demo the code
* Deployed the application to a live URL


### Notes on this project

* Working with the `OpenWeather API` was a fun exercise.  I was surprised that multiple API calls were needed to return the expected data.  It was a fun challenge to analyze the data points available in each API and come up with an approach that would be functional without being too confusing (for me, at least).  
* Again on this assignment, saving to `localStorage` and then retrieving was more complicated that I originally expected.  I needed to completely reformat my code mid-assignment in order to retrieve the searched cities history and allow the history to be usable to generate API calls to `OpenWeather` on click.  
* The trouble spots I encountered on this project were not what I expected:
    * Formatting the date to display based on the data returned from the API was frustrating and I am uncertain about my approach.  I am still not displaying the current date in the Current Weather Conditions div because I ran out of time to figure out how to accomplish this task.  When beginning this project, I certainly did not think that the date display would be the toughest obstacle that I would encoutner.
    * I have still not figured out how to get the search input to run on Enter from the keyboard.  I found it somewhat complicated to get the search button to sit on the input field and was satisfied with finally making it functional.  
    * The icons that display on the 5-day forecast are not aligned to my liking.  However, I feel that my comfort level with styling of UI elements is growing and I at least struggled less on this project than I have in the past.  So, I will call this progress a win and continue to improve.  

## Screenshots

The following image shows the weather dashboard appearance and functionality:

![Weather Dashboard](./assets/weather-dashboard)


## Application URL
* [Weather Dashboard](https://thorgriffs.github.io/weather-dashboard/)