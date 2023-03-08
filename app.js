const express = require("express");
const https = require("https");
const app = express();

app.get("/", (req, res) => {
  const weatherPathUrl = "https://api.openweathermap.org/data/2.5/weather?lat=10.804973&lon=78.6870296&appid=5a240c73d4ccc6381da9f0114cc006e0";

  https.get(weatherPathUrl, (response) => {
    console.log(response);

    response.on("data", (data) => {
      // parse the fetched data
      const weatherObj = JSON.parse(data);

      // weather description
      const weatherDescription = weatherObj.weather[0].description;

      // weather temperature
      const weatherTemperature = weatherObj.main.temp;
      const imgPath = `https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`;

      res.write("<p>Your current weather is: " + weatherDescription + " </p>");
      res.write("<h2>Temperature in your location is " + weatherTemperature +" </h2>");
      res.write("<img src=" + imgPath +  ">");
      res.send();
    })
  });
})

app.listen(3002, () => console.log("Server running at port 3002"));