import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";

import { UserContext } from "../util/userContext"
import API from "../util/API";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    spacer: {
        flexGrow: 1,
    },
    title: {
        textDecoration: "none",
        color: "white",
        display: "none",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    button: {
        color: "white",
        borderColor: "white",
    }
}));

export default function SearchAppBar() {
    const classes = useStyles();
    const history = useHistory();

    let searchError = false;
    let searchMessage =""
    
    const [search, setSearch] = React.useState("")

    const {user, setUser } = React.useContext(UserContext)

    const isLoggedOn = user.isLoggedOn;

    // use to test is the user object is changed
    // React.useEffect(() => {
    //     console.log(user)
    // }, [user] );

    function timerClearMessage() {
        const messageTimer = setTimeout(() => {
            searchError=false
            searchMessage=""
        }, 3000);
        return () => clearTimeout(messageTimer);
    }

    const runSearch = (event) => {
        event.preventDefault();

        if(search === "") {
            console.log("trying to set message")
            // searchError = true;
            // searchMessage = "You Must Enter Something To Search"
            // timerClearMessage()
        } else {
            setUser({...user, search: search})

            API.updateUserSearchHistory({
                search: search,
                email: user.email
            })
            .then(() => {
                API.search({
                    searchRequest: search
                })
                .then(res => {
                    console.log(res.data)
                    setUser({
                        ...user,
                        searchData: res.data
                    })
                })
                .then(()=>{
                    const timer = setTimeout(() => {
                        setSearch("")
                        history.push("/search")
                    }, 500);
                    return () => clearTimeout(timer);
                })
                .catch(err => console.log(err))
            })
        }
    }

    function handleLogout() {
        setUser({
            ...user,
            firstName: "",
            lastName: "",
            email: "",
            isLoggedOn: "false"
        })
        history.push("/")
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography component={Link} to="/" className={classes.title} variant="h6" noWrap>
                        Stream Finder
                    </Typography>
                    
                    <div className={classes.spacer} />
                        
                    {(()=> {
                        switch (isLoggedOn) {
                            case "user":
                                //  render is the user is logged in, search bar, welcome message and log out button
                                return (
                                    <>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Search…"
                                            value={search}
                                            autoFocus
                                            onChange={e => setSearch(e.target.value)}
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </div>
                                    <Button 
                                        variant="outlined"
                                        className={classes.button}
                                        onClick={runSearch} 
                                    >
                                        Search
                                    </Button>
                                    <div style={{
                                        marginLeft: "10px",
                                        color: "white"
                                    }}>Welcome {user.firstName}</div>
                                    <ExitToAppIcon 
                                    onClick={handleLogout}
                                    style={{
                                        cursor: "pointer",
                                        marginLeft: "10px"
                                    }}
                                    />
                                    </>
                                );
                            
                            case "admin":
                                // if admin is logged in, return only logout and welcome admin
                                return (
                                    <>
                                        <div style={{
                                            marginLeft: "10px"
                                        }}>Welcome {user.firstName}</div>

                                        <ExitToAppIcon 
                                        onClick={handleLogout}
                                        style={{
                                            cursor: "pointer",
                                            marginLeft: "10px"
                                        }}
                                        />
                                        
                                        <Button 
                                            className={classes.button}
                                            component={Link}
                                            to="/admin">Admin Page</Button>
                                    </> 
                                );

                            case "false":
                                // render the login and signup buttons if isloggedOn is set to the string false 
                                return (
                                    <div>
                                        <Button
                                            className={classes.button}
                                            component={Link}
                                            to="/login" 
                                            >Login</Button>
                                        <Button 
                                            className={classes.button}
                                            component={Link} 
                                            to="/signup">Sign Up</Button>
                                    </div>  
                                );
                        
                            default:
                                // if default do nothing
                                break;
                        }
                    })()}
                   
                </Toolbar>
            </AppBar>
        </div>
    );
}
    
    // treat inputbase as a regualr input
    // inputbase needs a value to be a controlled component & onChange
    // the onChange event needs to feature a debouncer to control auto reloading the api to often