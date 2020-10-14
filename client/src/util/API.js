const axios = require("axios");

export default {

    saveNetflix: function() {
        return axios.get("/api/admin")
    },

    getNetflix: function() {
        return axios.get("/api/netflix");
    },

    login: function(login) {
        // go to express api to check if user information is correct
        return axios.post("/api/user/login", login)
    },

    createUser: function(userData) {
        // sends the users data to the express api to send to the database 
        return axios.post("/api/user", userData)
    },
    
    resetPassword: function(newPassword) {
        //takes the newpassword data to the express api which does a update using user id and the updates the old password (want to use passport might need to check this)
        return axios.put("/api/user/password", newPassword)
    }, 

    checkEmail: function(email) {
        // calls the express api to check the database if the users email exists, if it does update the email 
        return axios.get("/api/user/email", email)
    }
}

