const db = require("../models");

const session = require("express-session");

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
            .catch(err => {
                if (err.code === 11000) {
                    res.json(err.keyPattern)
                }
                else {
                    res.status(422).json(err)
                }
            });
    },

    findOne: function(req, res) {
        console.log("trying to log in")
        db.User
            .findOne({
                email: req.body.email, 
                password: req.body.password 
            })
            .then(dbModal => {
                res.json(dbModal)
            })
            .catch(err => res.status(422).json(err))
    },

    updateSearchHistory: function (req, res) {
        console.log("trying to update search history")
        // console.log(req.body)
        db.User
            .findOneAndUpdate(
                {
                    email: req.body.email
                },
                {
                    $push: {
                        searchHistory: req.body.search
                    }
                }
            )
            .then(dbModal => {
                // console.log(dbModal)
                res.json(dbModal)
            })
            .catch(err => res.status(422).json(err))
    }
}

