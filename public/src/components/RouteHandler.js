import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import AuthComponent from "./AuthComponent";

/* component imports */
import LandingPage from "./PageComponents/LandingPage/LandingPage";
import ProjectsPage from "./PageComponents/ProjectsPage/ProjectsPage";

const RouteHandler = (props) => {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={<AuthComponent component={LandingPage}/>}/>
                <Route path="/projects" element={<AuthComponent component={ProjectsPage}/>}/>
            </Routes>
        </Router>
    );
}

export default RouteHandler;