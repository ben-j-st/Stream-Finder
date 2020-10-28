const db = require("../models");
const axios = require("axios");
const e = require("express");

require('dotenv').config()

const apiKeyGoWatch = process.env.GOWATCH_API;
const apiKeyIMDB = process.env.IMDB_API


// Defining methods for the netflixController

let type = ''
let id = ''

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

                // get a list of requests for the promise all 
                let requests = imdbResponse.map(individualData => {
                    type = individualData.Type
                    id = individualData.imdbID

                    // test to see if the data is being mapped correctly  
                    // console.log(`Title: ${individualData.Title}\nType: ${type} \nID: ${id}` )

                    const optionsGoWatch = {
                        method: 'POST',
                        url: 'https://rapidapi.p.rapidapi.com/lookup/title/imdb_id',
                        headers: {
                          'content-type': 'application/x-www-form-urlencoded',
                          'x-rapidapi-host': 'gowatch.p.rapidapi.com',
                          'x-rapidapi-key': `${apiKeyGoWatch}`
                        },
                        data: {country: 'au', type: `${type}`, id: `${id}`}
                    };

                    return axios.request(optionsGoWatch)
                    .then(goWatchResults => {
                        if(goWatchResults.data.message === 'not found') {
                            return {
                                success: false
                            }
                        } else {
                            return {
                                success: true,
                                data: goWatchResults.data
                            }
                        }        
                    })
                    .catch(error => {
                        console.error(error);
                    });
                })
                
                // a collection of request is sent to the promise handler, it waits until all have been settled
                Promise.all(requests)
                .then(promiseResponses => {
                    let filteredResponse = promiseResponses.filter(p => {
                       if (p.success === true) {
                           return p
                       }
                    })
                    return filteredResponse
                })
                .then(newResponse => {
                    res.json(newResponse)
                })
                .catch(err=> console.log(err))
            })
            .catch(function (error) {
                console.error(error);
            });
    },
}

  