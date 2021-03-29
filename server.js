const express = require("express");
const fetch = require("node-fetch");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const API_KEY = process.env.API_KEY;
app.use(cors());

const url = `https://restcountries-v1.p.rapidapi.com/all`;

app.get("/quiz", (req, res) => {
  fetch(url, {
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((myJson) => {
      res.send(myJson);
    })
    .catch((error) => {
      console.log(
        "😮 There has been a problem with the fetch operation: ",
        error.message
      );
    });
});
app.listen(3000);
