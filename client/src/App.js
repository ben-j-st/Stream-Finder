import React from 'react';
import './App.css';

// Pages 
import Main from "./pages/main";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import ResetPassword from "./pages/resetPassword";
import Admin from "./pages/admin";

// own components
import Header from "./components/header";
import Footer from"./components/footer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { UserProvider } from "./util/userContext";


function App() {

    return (
        <Router>
            <UserProvider>
                <Header />
                <Switch>
                    <Route path="/admin" component={Admin} />
                    {/* signup Page for new users to access more features */}
                    <Route path="/signup" component={SignUp}/>
                    {/* login page for returning users */}
                    <Route path="/login" component={Login} />
                    {/* if user forgets password */}
                    <Route path="/resetpassword" component={ResetPassword} />
                    {/* main page that loads first display basic data */}
                    <Route path="/" component={Main} />
                    
                </Switch>
            </UserProvider>
            <Footer />
        </Router>
    );
}
    
    export default App;
    