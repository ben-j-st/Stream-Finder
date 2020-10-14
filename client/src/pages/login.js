import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useHistory } from "react-router-dom";

import { UserContext } from "../util/userContext"

import { Link } from "react-router-dom";
import API from '../util/API';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const history = useHistory();

    const [login, setLogin] = React.useState({
        email: "",
        password: ""
    })

    const {user, setUser } = React.useContext(UserContext)

    function handleInputChange(event) {
        const { name, value } = event.target
        setLogin({...login, [name]: value})
    }

    function handleLogin(event) {
        event.preventDefault();

        API.login({
            email: login.email,
            password: login.password
        })
        .then( res => {
            const response = res.data
            console.log(res.data)
            setUser({
                ...user,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                isLoggedOn: true
            })
        })
        .then(history.push("/"))
        .catch(err => console.error(err))
    }
    
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoComplete="email"
                name="email"
                value={login.email}
                onChange={handleInputChange}
                label="Email Address"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                autoComplete= "current-password"
                value={login.password}
                onChange={handleInputChange}
                label="Password"
                type="password"

            />
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                className={classes.submit}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <MLink component={Link} to="/resetpassword" variant="body2">
                    Forgot password?
                </MLink>
                </Grid>
                <Grid item>
                <MLink component={Link} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </MLink>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
    );
}