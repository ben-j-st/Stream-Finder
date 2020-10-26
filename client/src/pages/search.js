import React, { useEffect } from "react";
import SearchCard from "../components/searchCard";
import Grid from "@material-ui/core/Grid"

import { UserContext } from "../util/userContext"
import { useHistory } from "react-router-dom";


function SearchPage() {
    const history = useHistory();
    const {user} = React.useContext(UserContext)
    const isLoggedOn = user.isLoggedOn;
    const searchData = user.searchData;

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
            <h1>Search Page </h1>
            <Grid container justify="center" spacing={1}>
                {searchData.length ? (
                    searchData.map(element => (
                        <SearchCard
                            key={element.data.imdb_id} 
                            title={element.data.name}
                            image={element.data.offers[0].image}
                            description={element.data.desc}
                            offers={element.data.offers}
                        />
                        
                    ))
                ) : (
                    <h1>Failed to get results</h1>
                )}
                <div className="spaceBuffer" style={{
                marginBottom: "500px"
            }}/>
            </Grid>
        </>
    )
}

export default SearchPage;