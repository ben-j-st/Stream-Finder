import React, { useState, useEffect } from "react";
import API from "../util/API";
import LineGrid from "../components/LineGrid"
import GridImage from "../components/gridImage"

function Main(props) {
    //the search value is props.search

    // used to store the netflix data in an array to be mapped to the database for faster loading 
    const [netflix, setNetflix] = useState([])

    const [amazon, setAmazon] = useState([])

    // should run only when search is entered
    useEffect(() => {
        onLoad()
    }, [])

    // load 30 days netflix from database 
    function onLoad() {
        API.getNetflix()
        .then(res => {
            setNetflix(res.data)
        })
        API.getAmazon()
        .then(res => {
            setAmazon(res.data)
        })
    }
  
    return (
        <>
            <h2>Netflix</h2>
            <LineGrid>
                {netflix.length ? (
                    netflix.map( result => (
                        <GridImage 
                        key={result.netflixid}
                        img={result.image}
                        title={result.title}
                        />
                    ))
                ) : (
                    <h1>Failed to get results</h1>
                )}
            </LineGrid>

            <h2>Amazon Prime</h2>
            <LineGrid>
                {amazon.length ? (
                    amazon.map( result => (
                        <GridImage 
                        key={result._id}
                        img={result.Poster}
                        title={result.Title}
                        />
                    ))
                ) : (
                    <h1>Failed to get results</h1>
                )}
            </LineGrid>
            <div className="spaceBuffer" style={{
                marginBottom: "100px"
            }}/>
        </>
    )
}

export default Main;


// content should handle the route to determine what loads 

// eventually want to have a public display without a search bar vs signined which includes a profile icon and the search bar
// need profile page
// need login page 
// need main page which displays all the search results

