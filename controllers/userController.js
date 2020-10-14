const db = require("../models");

// Defining methods for the userController

module.exports = {
    create: function(req, res) {
        console.log(req.body)
        db.User
            .create(req.body)
            .then(dbModel => {
                console.log("successfully created the user")
                res.json(dbModel)
            })
          .catch(err => res.status(422).json(err));
    },

    findOne: function(req, res) {
        console.log("trying to log in")
        db.User
            .findOne({
                email: req.body.email, 
                password: req.body.password 
            })
            .then(dbModal => res.json(dbModal))
            .catch(err => res.status(422).json(err))
    }
}

