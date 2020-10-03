import React from 'react';
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';
import "./style.css"



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    }
}));

function LineGrid({children}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {children}
            </GridList>
        </div>
    )
}

export default LineGrid;