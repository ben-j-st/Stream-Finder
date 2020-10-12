const db = require("../models");
const axios = require("axios")

// need to require dotenv before an env variable can be accesses
require('dotenv').config()
const apiKey = process.env.NETFLIX_API

// need api key as a process .env variable

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
                "x-rapidapi-key":`${apiKey}`,
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
}