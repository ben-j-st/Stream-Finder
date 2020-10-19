import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

import { UserContext } from "../util/userContext";

import API from "../util/API";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    
    const [newUser, setNewUser]= React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const {user, setUser } = React.useContext(UserContext)
    
    function handleSubmit(event) {
        event.preventDefault()

        let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (newUser.firstName.length === 0 ) {
            // error message display firstName is required
            console.log("we need a first name ")
        } else {
            if (newUser.email.match(mailFormat)) {
                console.log("email validation worked")
                if (newUser.password < 8) {
                    // error message display password is to short
                    console.log("password to short")
                } else {
                    API.createUser({
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email.toLowerCase().trim(),
                        password: newUser.password,
                        searchHistory: []
                    })
                    .then(res => {
                        console.log(res.data)
                        const response = res.data
                        if (response.email === 1) {
                            alert("Same email has been used")
                        } else {
                            // user data updated to reflect logged in user
                            setUser({
                                ...user,
                                firstName: response.firstName,
                                lastName: response.lastName,
                                email: response.email,
                                isLoggedOn: true,
                            })
                        }
                    })
                    .then(history.push("/"))
                    .catch(err => console.log(err))
                }
            } else if (newUser.email.toLowerCase().trim() === "admin") {
                API.createUser({
                    firstName: newUser.firstName,
                    email: newUser.email.toLowerCase().trim(),
                    password: newUser.password
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            } else {   
                // error message display email doesnt seem like a correct email address
                console.log("email validation failed")
            }
        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target
        setNewUser({...newUser, [name]: value})
    }
    
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="firstName"
                                inputProps={{
                                    maxLength: 40
                                }}
                                value={newUser.firstName}
                                autoComplete="first-name"
                                onChange={handleInputChange}
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="lastName"
                                inputProps={{
                                    maxLength: 40
                                }}
                                autoComplete="last-name"
                                value={newUser.lastName}
                                onChange={handleInputChange}
                                variant="outlined"
                                label="Last Name"
                            />
                            </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="email"
                                autoComplete="email"
                                value={newUser.email}
                                onChange={handleInputChange}
                                label="Email Address"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                autoComplete="current-password"
                                value={newUser.password}
                                onChange={handleInputChange}
                                label="Password"
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <MLink component={Link} to="/login" variant="body2">
                                Already have an account? Sign in
                            </MLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}