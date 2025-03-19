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

// require('dotenv').config({ path: '../.env' });
require('dotenv').config();


app.get("/", (req, res) => {
  res.json("hi");
});

//Address
app.get("/api/:address", (req, res) => {
  const LOCATION_API_KEY = process.env.LOCATION_API_KEY;

  const address = req.params.address;

  const options = {
    method: "GET",
    url: `https://geokeo.com/geocode/v1/search.php?q=${address}&api=${LOCATION_API_KEY}`,
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
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error with OpenWeather API:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Error - No weather data found" });
  }
});

// Sunrise-Sunset API
app.get("/sunrise-sunset", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  try {
    const response = await axios.get(
      `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error with Sunrise-Sunset API:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Error fetching sunrise-sunset data" });
  }
});

// API Key and URL for Trafikverket API
const API_KEY = 'bc67eb1d6aa0423c9fa3f69f93349e30';
const API_URL = 'https://api.trafikinfo.trafikverket.se/v2/data.json';

const xmlData = `
      <REQUEST>
          <LOGIN authenticationkey='${API_KEY}'/>
          <QUERY objecttype='Situation' schemaversion="1" limit="10">
              <FILTER>
             <NEAR name="Deviation.Geometry.WGS84" value="12.413973 56.024823"/>
               </FILTER>
          </QUERY>
      </REQUEST>`
// POST request to fetch traffic incidents for Sweden
app.get('/api/traffic-incidents', (req, res) => {
  axios.post(API_URL, xmlData, {
    headers: {
      "Content-Type": "text/xml", // Ensure XML content type 

    },
  })
    .then((response) => {
      console.log("Received response:", response.data);

      // Send the traffic data response back to the client
      res.json(response.data);
    })
    .catch((error) => {
      console.error('Error fetching traffic incidents:', error);
      res.status(500).send({ error: 'Failed to fetch traffic incidents' });

    });
});

// Start the server
app.listen(8000, () => console.log(`backend server running on port ${PORT}`));
