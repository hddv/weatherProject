//jshint esversion:6

const express = require("express");
const https = require("https");


const app = express();

app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=4cfd30f94ca5dab1767a9c4e0e3b066c&units=metric";


  https.get(url, response =>{
  
    response.on("data", data =>{
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const iconWeather = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + iconWeather + "@2x.png";
      
      res.write("<h1>Weather</h1>");
      res.write("<p>The temperature in Paris is " + temp + " degrees Celcius.</p>");
      res.write("<p>The weather is currently " + description + "</p>");

      res.write("<img src=" + imgURL + " alt='weather icon'>");

      res.send();
    });
  
  });


});




app.listen(3000, function(){
  console.log("Server in running on port 3000 ...");
})