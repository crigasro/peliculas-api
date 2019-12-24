const express = require("express");
const axios = require("axios");
const config = require("../config/config");

const API_KEY = config.apiKey;
const BASE_URL = config.baseURL;

let app = express();

// Handle request for a list of films given a search chain 
app.get("/search", (req, res) => {
    let query = req.query;
    let mbd_url = BASE_URL + "search/movie?api_key=" + API_KEY + "&query=" + query.chain;

    axios.get(mbd_url)
    .then((films) => {
        let results = films.data.results;

        results.forEach(result => {
            let json_res = JSON.stringify(result);
            console.log(json_res + "\n");
            res.write(json_res + "\n");
        });
        
        res.end("\n");
    })
    .catch((err) => {
        console.log("An error ocurred while requesting /search:\n", err);
        res.end("Error while requesting to The Movie DB");
    })
})

app.get("/getById", (req, res) => {
    let query = req.query;
    console.log("Req query id: ", query.id);
    console.log("Req query title: ", query.title);

    res.end("/getById request handled\n");
})

app.listen(8080, () => {
    console.log("Running on port 8080");
})