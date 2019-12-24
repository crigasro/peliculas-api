const express = require("express");
const config = require("../config/config");

const API_KEY = config.apiKey;
const BASE_URL = config.baseURL;

let app = express();

app.get("/api", (req, res) => {
    res.end("you requested /api\n")
})

app.listen(8080, () => {
    console.log("Running on port 8080");
})