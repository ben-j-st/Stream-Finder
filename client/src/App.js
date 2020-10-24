import React from 'react';
import './App.css';

// Pages 
import Main from "./pages/main";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import ResetPassword from "./pages/resetPassword";
import Admin from "./pages/admin";
import Search from "./pages/search";

// own components
import Header from "./components/header";
import Footer from"./components/footer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { UserProvider } from "./util/userContext";

import { createMuiTheme } from '@material-ui/core/styles';

import { ThemeProvider } from "@material-ui/core"
import blue from '@material-ui/core/colors/blue';


function App() {

    const theme = createMuiTheme({
        palette: {
          primary: {
            main: "#000",
          },
          secondary: {
              main: blue[500],
              light: "#fff"
          },
          text: {
              primary: "#fff",
              secondary: "#000"
          }
        }

      });

    return (
        <Router>
            <ThemeProvider theme={theme}>
            <UserProvider>
                <Header />
                <Switch>
                    <Route path="/admin" component={Admin} />
                    {/* signup Page for new users to access more features */}
                    <Route path="/signup" component={SignUp}/>
                    {/* login page for returning users */}
                    <Route path="/login" component={Login} />
                    {/* login page for returning users */}
                    <Route path="/search" component={Search} />
                    {/* if user forgets password */}
                    <Route path="/resetpassword" component={ResetPassword} />
                    {/* main page that loads first display basic data */}
                    <Route path="/" component={Main} />
                </Switch>
            </UserProvider>
            <Footer />
            </ThemeProvider>
        </Router>
    );
}
    
    export default App;
    