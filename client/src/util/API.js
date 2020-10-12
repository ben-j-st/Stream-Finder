const axios = require("axios");

export default {

    saveNetflix: function() {
        return axios.get("api/admin")
    },

    getNetflix: function() {
        return axios.get("api/netflix");
    },

    login: function() {
        // go to express api to check if user information is correct
        return
    },
    
    resetPassword: function(newPassword) {
        //takes the newpassword data to the express api which does a update using user id and the updates the old password (want to use passport might need to check this)
        return
    }, 

    checkEmail: function() {
        // calls the express api to check the databse if the users email exists, if it does update the email 
        return
    }
}

