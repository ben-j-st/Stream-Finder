const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const amazonSchema = new Schema({
    Title: { type: String, required: true },
    Type: {type: String},
    imdbID: {type: String, required: true},
    Link: {type: String},
    Plot: {type: String},
    Poster: {type:String}
});


const Amazon = mongoose.model("Amazon", amazonSchema);

module.exports = Amazon;