const PORT = 8000;

const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

const axios = require("axios");

require("dotenv").config();

app.get("/", (req, res) => {
  res.json("hi");
});

app.get("/api", (req, res) => {
  const options = {
    method: "GET",
    url: "https://geokeo.com/geocode/v1/search.php?q=sweden&api=cfe7350ecacc5378dc0636bd331e3bda",
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

app.listen(8000, () => console.log(`backend server running on port ${PORT}`));
