  const express = require("express");
  const https = require("https");
  const bodyParser = require("body-parser");

  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  })

  app.post("/", (req, res) => {

    const cityName = req.body.cityName;
    const apiKey = "5a240c73d4ccc6381da9f0114cc006e0";
    const weatherPathUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    https.get(weatherPathUrl, (response) => {
      response.on("data", (data) => {
        // parse the fetched data
        const weatherObj = JSON.parse(data);

        // weather description
        const weatherDescription = weatherObj.weather[0].description;

        // weather temperature
        const weatherTemperature = weatherObj.main.temp;
        const imgPath = `https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`;

        res.write("<p>Your current weather is: " + weatherDescription + " </p>");
        res.write("<h2>Temperature in " + weatherObj.name + " is " + weatherTemperature +" deg C </h2>");
        res.write("<img src=" + imgPath +  ">");
        res.send();
      })
    });
  })

  app.listen(3002, () => console.log("Server running at port 3002"));