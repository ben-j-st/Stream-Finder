import React from 'react';
import './App.css';
import Main from "./pages/main"

// own components
import Header from "./components/Header"
import Footer from"./components/Footer"

import { BrowserRouter as Router } from "react-router-dom"



function App() {
    return (
        <Router>
            <Header />
            <Main />
            <Footer />
        </Router>
        );
    }
    
    export default App;
    