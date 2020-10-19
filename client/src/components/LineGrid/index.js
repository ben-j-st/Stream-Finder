import React from 'react';
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';
import "./style.css"

import Grid from "@material-ui/core/Grid"
import Hidden from "@material-ui/core/Hidden";


import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: "237px"
    },
    gridList: {
        flexWrap: 'nowrap',
        overflow: 'auto',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
     
    },
    centerIcon: {
        display: "flex",
        margin: "auto",
        cursor: "pointer",
        '&:hover': {
            background: "#f00",
        },
    }
}));

function LineGrid({children}) {
    const classes = useStyles();
    const navRef = React.useRef();
    const maxAmount = 700
    const intervalTiming = 50


    function handleNav(direction) {
        let scrollAmount = 0;
        if (direction === "left") {
            const slideTimer = setInterval(() => {
                navRef.current.scrollLeft -= 100;
                scrollAmount += 100;
                if(scrollAmount >= maxAmount){
                    clearInterval(slideTimer);
                }
            }, intervalTiming);
            
        } else {
            const slideTimer = setInterval(() => {
                navRef.current.scrollLeft += 100;
                scrollAmount += 100;
                if(scrollAmount >= maxAmount){
                    clearInterval(slideTimer);
                }
            }, intervalTiming);
        }
    }

                

    return (
        <div className={classes.root}>
            <Grid container justify="center" alignItems="center" style={{
                maxHeight:"237px"
            }}>
                <Grid item xs={false} sm={1}>
                    <Hidden only="xs">
                            <NavigateBeforeIcon  
                                className={classes.centerIcon}
                                onClick={() => handleNav("left")}
                            />
                    </Hidden>
                </Grid>
                <Grid item xs={12} sm ={10}>
                    <GridList className={classes.gridList} ref={navRef}>
                        {children}
                    </GridList>
                </Grid>
                <Grid item xs={false} sm={1}>
                    <Hidden only="xs">
                        <NavigateNextIcon  
                            className={classes.centerIcon}
                            onClick={() => handleNav("right")}
                        />
                    </Hidden>
                </Grid>
            </Grid>
            
            
           
        </div>
    )
}

export default LineGrid;