import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';



const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        justifySelf: "center"
    },
}));

export default function BottomAppBar() {
    const classes = useStyles();
    
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                    <Typography variant="body2">
                        {'Copyright © '}
                        <Link color="inherit" target="_blank" href="https://ben-j-st.github.io/React-Profile/">
                            Ben Stephens
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
            </Toolbar>
        </AppBar>
    )
}
    
    
