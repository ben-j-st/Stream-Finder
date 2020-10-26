import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button'

import DisneyLogo from "../logo/disney.png"
import NetflixLogo from "../logo/netflix.png";
import PrimeLogo from "../logo/prime.png";
import HuluLogo from "../logo/hulu.jpg";

const useStyles = makeStyles({
    root: {
        background: "rgb(255,255,255,0.6)",
    },
    media: {
        height: "150px",
        width: "auto"
    },
    logo: {
        height: "50px",
        width: "auto",
        textDecoration: "none",
        marginRight: " 15px"
    }
});

    
export default function MediaCard(props) {
    const classes = useStyles();
    let provider = props.offers

    return (
        <Grid item xs={12} sm={6} md={12}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" color="textSecondary" component="h2">
                        {props.title}
                    </Typography>
                    <br/>
                    <img src={props.image} alt={props.title} className={classes.media}/>
                    <br/>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Synopsis: {props.description}
                    </Typography>
                    <br/>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Streaming Services Currently Showing: 
                    </Typography>
                    <br/>
                    {provider.length ? (
                        provider.map(item => {
                            if(item.flat === 1) {
                                switch (item.provider) {
                                    case "disneyplus":
                                        
                                        return (
                                            <a target="_blank" rel="noopener noreferrer"  href={item.url}><img src={DisneyLogo} alt={item.provider} className={classes.logo} /></a>
                                        )
                                    case "hulu":
                                    
                                        return (
                                            <a target="_blank" rel="noopener noreferrer" href={item.url}><img src={HuluLogo} alt={item.provider} className={classes.logo} /></a>
                                        )
                                    case "primevideo":
                                    
                                        return (
                                            <a target="_blank" rel="noopener noreferrer" href={item.url}><img src={PrimeLogo} alt={item.provider} className={classes.logo} /></a>
                                        )

                                    case "netflix":
                                    
                                        return (
                                            <a target="_blank" rel="noopener noreferrer" href={item.url}><img src={NetflixLogo} alt={item.provider} className={classes.logo} /></a>
                                        )
                            
                                    default:
                                        return (
                                            <Button target="_blank" rel="noopener noreferrer" href={item.url}>{item.provider}</Button>
                                            )
                                }
                                
                            }
                        })
                    ): (
                        <p>there are no providers</p>
                    )}
                    <br/>
                </CardContent>
            </Card>
        </Grid>
    );
}