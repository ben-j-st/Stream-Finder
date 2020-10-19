import React, { useEffect } from "react";
import API from "../util/API"
import Button from "@material-ui/core/Button"

import { UserContext } from "../util/userContext"
import { useHistory } from "react-router-dom";


function SearchPage() {

    const history = useHistory();
    const {user} = React.useContext(UserContext)
    const isLoggedOn = user.isLoggedOn;

    useEffect(() => {
        onLoad()
    }, )

    function onLoad(){
        if (isLoggedOn === true) {
            console.log("user is authenticated")
        } else {
            console.log("not logged in")
            history.push("/")
        }
    }

    return (
        <>
            <h1>This is the search page</h1>

        
        </>
    )
}

export default SearchPage;