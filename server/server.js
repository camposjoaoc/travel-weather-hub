const PORT = 8000;

const express = require("express");

const app = express();

const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.use(cors());

const axios = require("axios");

require("dotenv").config();

app.get("/", (req, res) => {
  res.json("hi");
});

//Address
app.get("/api/:address", (req, res) => {
  const LOCATION_API_KEY = process.env.LOCATION_API_KEY;

  const address = req.params.address;

  const options = {
    method: "GET",
    url: `https://geokeo.com/geocode/v1/search.php?q=${address}&api=ebcb220f665c23f17b45f4c40cb42fc4`,
  };
  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Lat & Lng
// app.get("/ap/:lat/:lng", (req, res) => {
//   const lat = req.params.lat;
//   const lng = req.params.lng;

//   const options2 = {
//     method: "GET",
//     url: `https://geokeo.com/geocode/v1/reverse.php?lat=${lat}&lng=${lng}&api=ebcb220f665c23f17b45f4c40cb42fc4`,
//   };
//   axios
//     .request(options2)
//     .then((response) => {
//       res.json(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });


//WeatherAPI
app.get("/forecast", async (req, res) => {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const API_ID = process.env.OPENWEATHER_API_ID;
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&id=${API_ID}&appid=${API_KEY}&units=metric&lang=en`
    );
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error("Error with OpenWeather API:", error.response?.data || error.message);
    res.status(500).json({ error: "Error - No weather data found" });
  }
});

app.listen(8000, () => console.log(`backend server running on port ${PORT}`));
