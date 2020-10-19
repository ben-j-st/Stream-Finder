const db = require("../models");
const axios = require("axios")

// need to require dotenv before an env variable can be accesses
require('dotenv').config()
const apiKeyNetflix = process.env.NETFLIX_API
const apiKeyAmazon = process.env.AMAZON_API
const apiKeyIMDB = process.env.IMDB_API

const apiKeyGoWatch = process.env.GOWATCH_API;

// need api key as a process .env variable

const optionsSave = {
    method: 'GET',
    url: 'https://rapidapi.p.rapidapi.com/new',
    params: {page: '1', country: 'au', days: '30'},
    headers: {
        'x-rapidapi-host': 'streamzui-streamzui-v1.p.rapidapi.com',
        'x-rapidapi-key': `${apiKeyAmazon}`
    }
};



// Defining methods for the admin

module.exports = {
    // only run once a month or so 
    // add code to delete all existing files from netflix database prior to running this code
    saveNetflix: function( req, res) {
        console.log(apiKey)
        axios({
            "method":"GET",
            "url":"https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"unogs-unogs-v1.p.rapidapi.com",
                "x-rapidapi-key":`${apiKeyNetflix}`,
                "useQueryString":true
            },"params":{
                "q":"get:new30:AU",
                "p":"1",
                "t":"ns",
                "st":"adv"
            }
        })
        .then( response => {
            // console.log(response.data.ITEMS)
            // res.json(response.data)
            let netflix = response.data.ITEMS
            
            netflix.map(individualData => {
                db.Netflix
                .create({ 
                    netflixid: individualData.netflixid,
                    title: individualData.title,
                    type: individualData.type,
                    image: individualData.image,
                    largeImage: individualData.largeimage,
                    synopsis: individualData.synopsis,
                    runtime: individualData.runtime,
                    released: individualData.released
                })
            })
        })
        .then(res.status(200).send("success"))
        .catch(err => res.status(422).json(err));
    },

    saveAmazon: function(req, res) {

        axios.request(optionsSave)
        .then(response => {

            console.log(response.data.Results)
            let amazon = response.data.Results
            
            amazon.map(individualData => {
                db.Amazon
                .create({
                    Title: individualData.Title,
                    Type: individualData.Type,
                    imdbID: individualData.imdbID,
                    Link: individualData.Link,
                    image: ""
                })
            })
            
        })
        .then(res.status(200).send("success"))
        .catch(err => {
            console.log(err)
            res.status(422).json(err);
        });
    },

    updateAmazon: function(req, res) {

        db.Amazon
            .find()
            .then(response => {
                // console.log(response)

                response.map(individualData => {
                    const imdbID = individualData.imdbID

                    const optionsUpdate = {
                        method: 'GET',
                        url: 'https://rapidapi.p.rapidapi.com/',
                        params: {i: `${imdbID}`, r: 'json'},
                        headers: {
                            'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
                            'x-rapidapi-key': `${apiKeyIMDB}`
                        }

                    };

                    axios.request(optionsUpdate)
                    .then(imdbResponse => {
                        const ID = imdbResponse.data.imdbID
                        const Plot = imdbResponse.data.Plot
                        const Poster = imdbResponse.data.Poster
                        // console.log("this is a new response \n")
                        // console.log(imdbResponse.data.imdbID)
                            db.Amazon
                                .findOneAndUpdate(
                                    {
                                        imdbID: ID
                                    },
                                    {
                                        Plot: Plot,
                                        Poster: Poster
                                    }
                                )
                                .then(findResponse => {
                                    console.log(findResponse)
                                })
                                .catch(err => res.status(422).json(err));
                    
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(422).json(err);
                    });
                })
            })
            .catch(err => res.status(422).json(err));
    },

    testSearch: function(req, res) {

        console.log("testing search")
        const optionsGoWatch = {
            method: 'POST',
            url: 'https://rapidapi.p.rapidapi.com/lookup/title/tmdb_id',
            params: {country: 'us', type: 'movie', id: '496243'},
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'x-rapidapi-host': 'gowatch.p.rapidapi.com',
              'x-rapidapi-key': 'd6e74a7f3dmshfffae2adaabd293p1034afjsneb507d0a99fd'
            },
            data: {id: '496243', type: 'movie', country: 'us'}
          };

        axios.request(optionsGoWatch)
        
        .then(function (responseGoWatch) {
            console.log(responseGoWatch.data)

            res.json(responseGoWatch.data)
        }).catch(function (error) {
            console.error(error);
        });
    }
}