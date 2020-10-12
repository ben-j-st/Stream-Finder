import React, { useState, useEffect } from "react";
import API from "../util/API";
import LineGrid from "../components/LineGrid"
import GridImage from "../components/gridImage"

function Main(props) {

    const navRef = React.useRef()
    //the search value is props.search

    // used to store the netflix data in an array to be mapped to the database for faster loading 
    const [netflix, setNetflix] = useState([])

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
    }

    // function to get all new released netflix data from the last 30 days then save it to the database 
    // onClick event which needs to be moved to the admin page when created
    function doAdmin(event) {
        event.preventDefault();
        API.saveNetflix()
        .then(console.log("we have success"))
    }

    function handleNav(direction) {
        if (direction === "left") {
            navRef.current.scrollLeft -= 200
        } else {
            navRef.current.scrollLeft += 200
        }
    }
  
    return (
        <>
        <h2>Netflix</h2>
        <LineGrid>
            <button
            onClick={() => handleNav("left")
            }>
                prev
            </button>
            <div style={{
                whiteSpace: "nowrap",
                overflow: "auto"
            }} ref={navRef}>
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
            </div>
            <button
            onClick={() => handleNav("right")
            }>
                next
            </button>
        </LineGrid>
        </>
    )
}

export default Main;

// this was used to access the route needed to update the netflix database
{/* <Button
onClick={doAdmin}
>Admin</Button> */} 

// content should handle the route to determine what loads 

// eventually want to have a public display without a search bar vs signined which includes a profile icon and the search bar
// need profile page
// need login page 
// need main page which displays all the search results


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
