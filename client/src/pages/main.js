import React, { useState, useEffect } from "react";
import API from "../util/API";
import LineGrid from "../components/LineGrid"
import GridImage from "../components/GridImage"

function Main() {
    const [search, setSearch] = useState([])

    useEffect(() => {
        populatePage()
    }, [])


    function populatePage() {
        API.searchAllNetflix()
        .then( res => {
            // check what we get back / if it works
            // console.log(res)
            setSearch(res.data.results)
        })
    }

    return (
        <>
        <h2>Netflix</h2>
        <LineGrid>
            {search.length ? (
                search.map( result => (
                    <GridImage 
                    key={result.id}
                    img={result.img}
                    title={result.title}
                    />
                ))
            ) : (
                <h1>Failed to get results</h1>
            )}
        </LineGrid>
        </>
    )
}

// content should handle the route to determine what loads 

// eventually want to have a public display without a search bar vs signined which includes a profile icon and the search bar
// need profile page
// need login page 
// need main page which displays all the search results

export default Main;