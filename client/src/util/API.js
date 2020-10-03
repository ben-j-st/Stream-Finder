const axios = require("axios");

export default {
    searchAllNetflix: function() {
        return axios({
            "method":"GET",
            "url":"https://unogsng.p.rapidapi.com/search",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"unogsng.p.rapidapi.com",
            "x-rapidapi-key":"d6e74a7f3dmshfffae2adaabd293p1034afjsneb507d0a99fd",
            "useQueryString":true
            },"params":{
            "start_year":"1972",
            "orderby":"rating",
            "audiosubtitle_andor":"and",
            "limit":"100",
            "subtitle":"english",
            "audio":"english",
            "country_andorunique":"unique",
            "offset":"0",
            "end_year":"2019"
            }
        })
    },

    specificSearch: function(query) {
        return axios({
            "method":"GET",
            "url":"https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key":"d6e74a7f3dmshfffae2adaabd293p1034afjsneb507d0a99fd",
            "useQueryString":true
            },"params":{
            "term":{query},
            "country":"au"
            }
        })
    }

}

