import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    }
}));

export default function BottomAppBar() {
    const classes = useStyles();
  
    return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
            <h1>Footer</h1>
        </Toolbar>
    </AppBar>
    )
}