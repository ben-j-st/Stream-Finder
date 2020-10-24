import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "white",
        padding: "50px",
        borderRadius: "20px"
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
    }
}));

export default function SignIn() {
    const classes = useStyles();

    const [user, setUser] = React.useState({
        password: "",
        confirmPassword: "",
        email: ""
    })

    function resetPassword(event) {
        event.preventDefault();

        if (user.password && user.confirmPassword < 8) {
            // display error about userData length
        } else if (user.password === user.confirmPassword) {
            // do the function about password stuff
        } else {
            // something unexpected
        }
        // need the data for password
        // need to validate the password against password standards 
        // display error message if password doesnt match regex password format

        // then do an api call with the the returned data from the api call from the email check 

        // do an update statement on the user matching id 
    }

    function handleEmail(event) {
        event.preventDefault();
    }

    function handleInputChange(event) {
        const { name, value } = event.target
        setUser({...user, [name]: value})
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5" style={{color: "black"}}>
                Forgotten Password
            </Typography>
            <form className={classes.form} noValidate>
            
            { user.email ? (
                <>
                    <Typography component="h2" variant="h5" style={{color: "black"}}>
                        Please Enter New Password And Confirm
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        autoComplete="current-password"
                        value={user.password}
                        onChange={handleInputChange}
                        label="New Password"
                        type="password"
                        InputProps={{
                            className: classes.textColor
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        autoComplete="second-password"
                        onChange={handleInputChange}
                        value={user.confirmPassword}
                        label="Confirm Password"
                        type="password"
                        InputProps={{
                            className: classes.textColor
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={resetPassword}
                    >
                        Confirm Password
                    </Button>
                </>
            ) : (
                <>
                    <Typography component="h5" variant="h5" style={{color: "black"}}>
                        Please Enter Your Registered Email
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        autoComplete="email"
                        value={user.email}
                        onChange={handleInputChange}
                        label="Email Address"
                        autoFocus
                        InputProps={{
                            className: classes.textColor
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={handleEmail}
                    >
                        Confirm email
                    </Button>
                </>
            )}
            
          
            </form>
        </div>
        </Container>
    );
}