import React, { useEffect } from "react";


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
        if (isLoggedOn === "user") {
            console.log("user is authenticated")

           
        } else {
            console.log("not logged in")
            history.push("/")
        }
    }

    return (
        <>
            
        </>
    )
}

export default SearchPage;