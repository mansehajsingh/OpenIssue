import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

const RouteHandler = (props) => {
    return (
        <Router basename="/">
            <Routes>
            </Routes>
        </Router>
    );
}

export default RouteHandler;