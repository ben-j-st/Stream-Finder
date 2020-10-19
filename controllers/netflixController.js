const db = require("../models");

// Defining methods for the netflixController

module.exports = {
    findAll: function(req, res) {
        db.Netflix
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
}

