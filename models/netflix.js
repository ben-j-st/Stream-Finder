const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const netflixSchema = new Schema({
    netflixid: { type: Number, required: true},
    title: { type: String, required: true },
    type: { type: String }, 
    image: { type: String, required: true },
    largeImage: { type: String, required: true},
    synopsis: { type: String},
    runtime: { type: String},
    released: { type: Number}
});


const Netflix = mongoose.model("Netflix", netflixSchema);

module.exports = Netflix;

//  type should return if movie or tv show should help with searching later