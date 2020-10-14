import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button'

import { Link } from "react-router-dom"

import { UserContext } from "../util/userContext"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        textDecoration: "none",
        color: "white"

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
}));

export default function SearchAppBar() {
    const classes = useStyles();
    
    const [search, setSearch] = React.useState("")

    const {user, setUser } = React.useContext(UserContext)

    // use to test is the user object is changed
    // React.useEffect(() => {
    //     console.log(user)
    // }, [user] );

    const updateSearch = (event) => {
        event.preventDefault();
        setUser({...user, search: search})
    }

    const isLoggedOn = user.isLoggedOn;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography component={Link} to="/" className={classes.title} variant="h6" noWrap>
                        Stream Finder
                    </Typography>
                    

                        {isLoggedOn ? (
                            <>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        value={search}
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
                                    color="secondary"
                                    onClick={updateSearch} 
                                >
                                    Search
                                </Button>
                                <div style={{
                                    marginLeft: "10px"
                                }}>Welcome {user.firstName}</div>
                            </>
                        ): (
                            <>
                                <Button component={Link} to="/login">Login</Button>
                                <Button component={Link} to="/signup">Sign Up</Button>
                            </>
                        )}
                        
                   
                    
                </Toolbar>
            </AppBar>
        </div>
    );
}
    
    // treat inputbase as a regualr input
    // inputbase needs a value to be a controlled component & onChange
    // the onChange event needs to feature a debouncer to control auto reloading the api to often