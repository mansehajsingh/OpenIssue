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
import ProfilePage from "./PageComponents/ProfilePage/ProfilePage";
import AdminDashboardPage from "./PageComponents/AdminDashboardPage";
import AboutPage from "./PageComponents/AboutPage";

const RouteHandler = (props) => {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={<AuthComponent component={LandingPage}/>}/>
                <Route path="/projects" element={<AuthComponent requiresAuth component={ProjectsPage}/>}/>
                <Route path="/projects/:project_id" element={<AuthComponent requiresAuth component={ProjectPage}/>}/>
                <Route path="/projects/:project_id/admin" element={<AuthComponent requiresAuth component={AdminDashboardPage}/>}/>
                <Route path="/projects/:project_id/create-issue" element={<AuthComponent requiresAuth component={CreateIssuePage}/>}/>
                <Route path="/projects/:project_id/issues/:issue_id" element={<AuthComponent requiresAuth component={IssuePage}/>}/>
                <Route path="/profile" element={<AuthComponent requiresAuth component={ProfilePage}/>}/>
                <Route path="/about" element={<AuthComponent component={AboutPage}/>}/>
            </Routes>
        </Router>
    );
}

export default RouteHandler;