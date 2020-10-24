import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  root: {
    background: "rgb(255,255,255,0.6)",
  },
  media: {
    height: 150,
    width: "auto"
  },
});

    
export default function MediaCard(props) {
    const classes = useStyles();
    let provider = props.offers
    // let providerArray = []
    // let filteredProviders = []

    // function getProviders() {
    //     console.log("function started")
    //     filteredProviders = provider.filter(item_el => {
    //         console.log(item_el)
    //         return providerArray.filter(filtered_el => {
    //             if(item_el.provider !== filtered_el) {
    //                 console.log("item el \n")
    //                 console.log(item_el)
    //                 console.log("filtered el \n")
    //                 console.log(filtered_el)
    //                 providerArray.push(item_el.provider)
    //                 return filtered_el.provider == item_el
    //             }
    //         }).length == 0
    //     })
    // }

    // getProviders()

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
                                return (
                                <Button target="_blank" href={item.url}>{item.provider}</Button>
                                )
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