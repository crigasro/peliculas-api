const express = require("express");
const axios = require("axios");
const config = require("../config/config");

const API_KEY = config.apiKey;
const BASE_URL = config.baseURL;

let app = express();

// Handle request for a list of movies given a search chain 
app.get("/search", (req, res) => {
    let query = req.query;
    let mbd_url = BASE_URL + "search/movie?api_key=" + API_KEY + "&query=" + query.chain;

    axios.get(mbd_url)
    .then((movies) => {
        let results = movies.data.results;
        res.setHeader('Content-Type', 'application/json');
        let json_res = JSON.stringify(results);
        res.end(json_res, null, 2);
    })
    .catch((err) => {
        console.log("An error ocurred while requesting /search:\n", err);
        res.end("Error while requesting to The Movie DB");
    })
})

// Handle request for a detail of a movie given its id
app.get("/getById", (req, res) => {
    let query = req.query;
    let movie_id = query.id;
    let movie_detail = query.detail;
    console.log("Req query id: ", movie_id);
    console.log("Req query detail: ", movie_detail);
    
    let mbd_url = "";
    
    if(movie_detail != "cast") {
        mbd_url = BASE_URL + "movie/" + movie_id + "?api_key=" + API_KEY;
    } else {
        mbd_url = BASE_URL + "movie/" + movie_id + "/credits?api_key=" + API_KEY;
    }

    axios.get(mbd_url)
    .then((movie) => {
        switch(movie_detail){
            case "title": 
                res.write(movie.data.original_title, null, 2);
                break;
            case "description":
                res.write(movie.data.overview, null, 2);
                break;
            case "poster": 
                let poster_path = "http://image.tmdb.org/t/p/w185" + movie.data.poster_path
                res.write(poster_path, null, 2);
                break;
            case "cast":
                res.write(JSON.stringify(movie.data.cast, null, 2));
                break;
        }
        res.end()
    })
    .catch((err) => {
        console.log("An error ocurred while requesting movie by id:\n", err);
        res.end("Error while requesting to The Movie DB by movie id");
    })
})

app.listen(8080, () => {
    console.log("Running on port 8080");
})