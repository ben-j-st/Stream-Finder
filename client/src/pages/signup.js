import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

import { UserContext } from "../util/userContext";

import API from "../util/API";

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
        marginTop: theme.spacing(3),
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

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    const [newUser, setNewUser]= React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [errors, setErrors ] = React.useState({})
    const {user, setUser } = React.useContext(UserContext)

    function validate() {
        let temp = {}
        temp.firstName = newUser.firstName?"":"You must Enter a First Name"
        temp.email = (mailFormat).test(newUser.email)?"":"Email Is Not Valid"
        temp.password = newUser.password.length>7?"":"Password Must Be 8 Characters or More"

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

    function createUser() {
        API.createUser({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email.toLowerCase().trim(),
            password: newUser.password,
            searchHistory: []
        })
        .then(res => {
            const response = res.data
            if (response.email === 1) {
                setErrors({
                    email: "This email address is already in use"
                })
                timerClearMessage()
            } else {
                // user data updated to reflect logged in user
                setUser({
                    ...user,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                    isLoggedOn: "user",
                })
                history.push("/")
            }       
        })
        .catch(err => console.log(err))
    }
    
    
    function handleSubmit(event) {
        event.preventDefault()

        if (validate()){
            console.log("valid")
            createUser()
        } else {
            console.log("failed validation")
            timerClearMessage()
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
                <Typography component="h1" variant="h5" style={{color: "black"}}>
                    Sign Up
                </Typography>
                <form className={classes.form} autoComplete="off">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <InputField 
                                name="firstName"
                                label="First Name"
                                autoFocus
                                required
                                value={newUser.firstName}
                                onChange={handleInputChange}
                                error={errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputField 
                                name="lastName"
                                label="Last Name"
                                value={newUser.lastName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField 
                                name="email"
                                label="Email Address"
                                required
                                value={newUser.email}
                                onChange={handleInputChange}
                                error={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField 
                                name="password"
                                label="Password"
                                type="Password"
                                required
                                value={newUser.password}
                                onChange={handleInputChange}
                                error={errors.password}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
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
            <div className={classes.spacer} />
        </Container>
    );
}