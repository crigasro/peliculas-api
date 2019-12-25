const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const API_KEY = config.apiKey;
const BASE_URL = config.baseURL;

let app = express();

// Login will be mocked
app.post('/login', (req, res) => {
    const mockUser = {
        id: 1,
        username: "john",
        email: "john@doe.com"
    }
    jwt.sign({user: mockUser}, "secretkey", (err, token) => {
        res.json({token});
    })
})

// Handle request for a list of movies given a search chain 
app.get("/search", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, data) => {
        let query = req.query;
        let mbd_url = BASE_URL + "search/movie?api_key=" + API_KEY + "&query=" + query.chain;
    
        if(query.chain == "" || typeof query.chain == "undefined") {
            res.end("You need to write something for chain parameter");
        } else {
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
        }
    })
})

// Handle request for a detail of a movie given its id
app.get("/getById", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, data) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let query = req.query;
            let movie_id = query.id;
            let movie_detail = query.detail;
            console.log("Req query id: ", movie_id);
            console.log("Req query detail: ", movie_detail);
            
            if(movie_detail == "" || typeof movie_detail == "undefined") {
                res.end("You need to write something for detail parameter");
            }
        
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
                    default:
                        res.write("Detail can only be title, description, poster or cast");
                        break;
                }
                res.end()
            })
            .catch((err) => {
                console.log("An error ocurred while requesting movie by id:\n", err);
                res.end("Error while requesting to The Movie DB by movie id");
            })
        }
    })    
})

app.listen(8080, () => {
    console.log("Running on port 8080");
})

// Verify token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader != "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}