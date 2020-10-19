const db = require("../models");
const axios = require("axios")

require('dotenv').config()

const apiKeyGoWatch = process.env.GOWATCH_API;
const apiKeyIMDB = process.env.IMDB_API

// Defining methods for the netflixController

let type = ''
let id = ''

let dataToBeReturned = []


module.exports = {
    search: function(req, res) {
        console.log("trying to search")
        console.log(req.body)
        let searchRequest = req.body.searchRequest

        const optionsIMDB = {
            method: 'GET',
            url: 'https://rapidapi.p.rapidapi.com/',
            params: {s: `${searchRequest}`, page: '1', r: 'json'},
            headers: {
              'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
              'x-rapidapi-key': `${apiKeyIMDB}`
            }
        };
          
        axios.request(optionsIMDB)
            .then(function (response) {

                // console.log(response.data)

                let imdbResponse = response.data.Search
                console.log(imdbResponse)

                // imdbResponse.map(individualData => {
                //     type = individualData.Type
                //     id = individualData.imdbID

                //     const optionsGoWatch = {
                //         method: 'POST',
                //         url: 'https://rapidapi.p.rapidapi.com/lookup/title/imdb_id',
                //         headers: {
                //           'content-type': 'application/x-www-form-urlencoded',
                //           'x-rapidapi-host': 'gowatch.p.rapidapi.com',
                //           'x-rapidapi-key': `${apiKeyGoWatch}`
                //         },
                //         data: {country: 'au', type: `${type}`, id: `${id}`}
                //     };

                //     axios.request(optionsGoWatch)
                    
                //     .then(function (responseGoWatch) {
                //         console.log(responseGoWatch.data.name)
                //     }).catch(function (error) {
                //         console.error(error);
                //     });
                // })
            })
            .then(res.json(dataToBeReturned))
            .catch(function (error) {
                console.error(error);
            });
    },
}

