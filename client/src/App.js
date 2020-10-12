import React from 'react';
import './App.css';


// Pages 
import Main from "./pages/main";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import ResetPassword from "./pages/resetPassword"

// own components
import Header from "./components/header";
import Footer from"./components/footer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"



function App() {

    const [search, setSearch] = React.useState([])

    const [user, setUser] = React.useState({
        username: "",
        isLoggedIn: false
    })

    
    return (
        <Router>
            <Header 
            search={search}
            setSearch={setSearch}
            user={user}
            setUser={setUser}
            />
            <Switch>
                {/* signup Page for new users to access more features */}
                <Route path="/signup">
                    <SignUp />
                </Route>
                {/* login page for returning users */}
                <Route path="/login">
                    <Login />
                </Route>
                 {/* if user forgets password */}
                 <Route path="/resetpassword">
                    <ResetPassword />
                </Route>
                {/* main page that loads first display basic data */}
                <Route path="/">
                    <Main 
                        search={search}
                    />
                </Route>
            </Switch>
            
            <Footer />
        </Router>
    );
}
    
    export default App;
    