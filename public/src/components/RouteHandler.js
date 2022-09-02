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
import ProjectPage from "./PageComponents/ProjectPage";
import CreateIssuePage from "./PageComponents/CreateIssuePage";
import IssuePage from "./PageComponents/IssuePage";

const RouteHandler = (props) => {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={<AuthComponent component={LandingPage}/>}/>
                <Route path="/projects" element={<AuthComponent component={ProjectsPage}/>}/>
                <Route path="/projects/:project_id" element={<AuthComponent component={ProjectPage}/>}/>
                <Route path="/projects/:project_id/create-issue" element={<AuthComponent component={CreateIssuePage}/>}/>
                <Route path="/projects/:project_id/issues/:issue_id" element={<AuthComponent component={IssuePage}/>}/>
            </Routes>
        </Router>
    );
}

export default RouteHandler;