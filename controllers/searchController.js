const db = require("../models");
const axios = require("axios")

require('dotenv').config()

const apiKeyGoWatch = process.env.GOWATCH_API;
const apiKeyIMDB = process.env.IMDB_API
const apiKeyNetflix = process.env.NETFLIX_API;

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


                // // console.log(response.data)

                let imdbResponse = response.data.Search

                res.json(imdbResponse)
                // console.log("trying for mapping")

                // imdbResponse.map(data => {
                //     id = data.imdbID

                //     const optionsNetflix = {
                //         method: 'GET',
                //         url: 'https://rapidapi.p.rapidapi.com/title',
                //         params: {imdbid: `${id}`},
                //         headers: {
                //           'x-rapidapi-host': 'unogsng.p.rapidapi.com',
                //           'x-rapidapi-key': `${apiKeyNetflix}`
                //         }
                //     };
                      
                //       axios.request(optionsNetflix)
                //         .then(function (response) {
                //             console.log("data entry \n")
                //             console.log(response.data.results[0]);

                //             res.json(response.data.results[0])
                //         }).catch(function (error) {
                //             console.error(error);
                //         });
                // })
                // .then(console.log(dataToBeReturned))
                // .then()
            })
            .catch(function (error) {
                console.error(error);
            });
    },
}

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