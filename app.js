const express = require("express");
const https = require("https");
const app = express();

app.get("/", (req, res) => {
  const weatherPathUrl = "https://api.openweathermap.org/data/2.5/weather?lat=10.804973&lon=78.6870296&appid=5a240c73d4ccc6381da9f0114cc006e0";
  https.get(weatherPathUrl, (response) => {
    console.log(response);
  })

  res.send("Weather forecast");
})

app.listen(3002, () => console.log("Server running at port 3002"));