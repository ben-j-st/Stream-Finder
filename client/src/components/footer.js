import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grid: {
        background: theme.palette.primary.main
    }
}));

export default function BottomAppBar() {
    const classes = useStyles();
    
    return (
        <Grid container className={classes.grid} style={{
           textAlign: "center",
           color: "white",
           height: "auto",
           bottom: 0,
           position: "fixed",
           padding: "20px"
        }}>
            <Grid item xs={12}>
                <Typography variant="body2">
                    {'Copyright © '}
                    <Link color="inherit" target="_blank" href="https://ben-j-st.github.io/React-Profile/">
                        Ben Stephens
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Grid>
        </Grid>

    )
}
    
    
