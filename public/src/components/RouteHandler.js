import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import AuthComponent from "./AuthComponent";

/* component imports */
import LandingPage from "./PageComponents/LandingPage/LandingPage";

const RouteHandler = (props) => {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={<AuthComponent component={LandingPage}/>}/>
            </Routes>
        </Router>
    );
}

export default RouteHandler;