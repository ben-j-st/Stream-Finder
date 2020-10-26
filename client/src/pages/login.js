import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useHistory } from "react-router-dom";

import { UserContext } from "../util/userContext"

import { Link } from "react-router-dom";
import API from '../util/API';

import InputField from "../components/inputField";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "white",
        padding: "50px",
        borderRadius: "15px 40px"
    },
     form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textColor: {
        color: "black"
    },
    spacer: {
        [theme.breakpoints.down('sm')]: {
            height: "70px",
        }
    }
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();
    

    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const [login, setLogin] = React.useState({
        email: "",
        password: ""
    })

    const {user, setUser } = React.useContext(UserContext)

    const [errors, setErrors ] = React.useState({})

    function handleInputChange(event) {
        const { name, value } = event.target
        setLogin({...login, [name]: value})
    }

    function validate() {
        let temp = {}

        temp.email = (mailFormat).test(login.email)?"":"Email Is Not Valid"
        temp.password = login.password.length>7?"":"Password Must Be 8 Characters or More"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }

    function timerClearMessage() {
        const messageTimer = setTimeout(() => {
            setErrors({})
        }, 5000);
        return () => clearTimeout(messageTimer);
    }

    function adminLogin() {
        // login for admin
        API.login({
            email: login.email.toLowerCase().trim(),
            password: login.password
        })
        .then(res => {
            if (res.data === null) {
                setErrors({
                    email: "Incorrect Login Details",
                    password: "Incorrect Login Details"
                })
                timerClearMessage()
            } else {
                const response = res.data
                setUser({
                    ...user,
                    firstName: response.firstName,
                    email: response.email,
                    isLoggedOn: "admin"
                })
                    const timer = setTimeout(() => {
                        history.push("/admin")
                    }, 100);
                    return () => clearTimeout(timer);
            }
            
        })
        .catch(err => console.log(err))
    }

    function userLogin() {
        API.login({
            email: login.email,
            password: login.password
        })
        .then( res => {
            if(res.data === null) {
                setErrors({
                    email: "Incorrect Login Details",
                    password: "Incorrect Login Details"
                })
                timerClearMessage()
            } else {
                const response = res.data
                // console.log(res.data)
                setUser({
                    ...user,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email.toLowerCase().trim(),
                    isLoggedOn: "user",
                })
                history.push("/")
            }
        })
        .catch(err => console.error(err))
    }

    function handleLogin(event) {
        event.preventDefault();

        if(validate()) {
            if(login.email.toLowerCase().trim() === "admin@admin.com"){
                adminLogin()
            } else {
                userLogin()
            }
        } else {
            timerClearMessage()
        }
    }
    
    return (
        <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5" style={{color: "black"}}>
            Login
            </Typography>
            <form className={classes.form} autoComplete="off">
                <InputField 
                name="email"
                label="Email"
                autoFocus
                required
                onChange={handleInputChange}
                error={errors.email}
                />
                <InputField 
                name="password"
                label="Password"
                type="Password"
                required
                onChange={handleInputChange}
                error={errors.password}
                />
            {/* <TextField
                variant="outlined"
                margin="normal"
                required
               
                helperText={error.email ? message.email : ' '}
                name="email"
                value={login.email}
                onChange={handleInputChange}
                label="Email Address"
                // autoFocus
                InputProps={{
                    className: classes.textColor
                }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                name="password"
                helperText={error.password ? message.password : ' '}
                value={login.password}
                onChange={handleInputChange}
                label="Password"
                type="password"
                InputProps={{
                    className: classes.textColor
                }}

            /> */}
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
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
        <div className={classes.spacer} />
        </Container>
    );
}