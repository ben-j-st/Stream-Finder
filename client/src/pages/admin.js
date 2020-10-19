import React, { useEffect } from "react";
import API from "../util/API"
import Button from "@material-ui/core/Button"

import { UserContext } from "../util/userContext"
import { useHistory } from "react-router-dom";


function AdminPage() {

    const history = useHistory();
    const {user} = React.useContext(UserContext)
    const isLoggedOn = user.isLoggedOn;

    // function to get all new released netflix data from the last 30 days then save it to the database 
    // onClick event which needs to be moved to the admin page when created
    function saveNetflix(event) {
        event.preventDefault();
        API.saveNetflix()
        .then(console.log("we have success"))
    }

    function saveAmazon() {
        API.saveAmazon()
        .then(res=> {
            console.log(res)
            // replace with modals
            alert("we are success")
        })
    }

    function updateAmazon() {
        API.updateAmazon()
        .then(res=> {
            console.log(res)
            // replace with modals
            alert("we are success")
        })
    }

    function testSearch() {
        API.testSearch()
        .then(res => console.log(res))
    }

    useEffect(() => {
        onLoad()
    }, )

    function onLoad(){
        if (isLoggedOn === "admin") {
            console.log("admin is authenticated")
        } else {
            console.log("not admin")
            history.push("/")
        }
    }

    return (
        <>
            <h1>This is the admin page</h1>

            <Button
                onClick={saveNetflix}
            >Add Netflix</Button>

            <Button
                onClick={saveAmazon}
            >Add Amazon</Button>

            <Button
                onClick={updateAmazon}
            >Update Amazon</Button>

            <Button
                onClick={testSearch}
            >testSearch</Button>
        </>
    )
}

export default AdminPage;

    // const test = () => {
    //     console.log(props.search)
    // }
    // function populatePage() {
    //     API.searchAllNetflix()
    //     .then( res => {
    //         // check what we get back / if it works
    //         // console.log(res)
    //         setInitialLoad(res.data.results)
    //     }).then(runSearch(props.search))
    // }

      // function runSearch(query) {
    //     API.specificSearch(query)
    //     .then( res => {
    //         console.log(res)
    //         // setSearch(r)
    //     })
    // }

    
// this was used to access the route needed to update the netflix database


    