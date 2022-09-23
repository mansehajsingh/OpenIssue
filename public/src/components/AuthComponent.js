import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getSelfFromToken } from "../redux/slices/userSlice";
import ErrorPage from "./PageComponents/ErrorPage";

const AuthComponent = ({ component, requiresAuth = false }) => {
    const Component = component;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        user.identity ? setIsAuthenticated(true) : dispatch(getSelfFromToken());
    }, []);

    useEffect(() => user.identity && setIsAuthenticated(true), [user.identity]);

    useEffect(() => {
        if (user.tokenCreated) {
            dispatch(getSelfFromToken());
        }
    }, [user.tokenCreated]);
    
    if (requiresAuth && !user.identity) {
        return (
            <ErrorPage />
        );
    }

    return (
        <Component isAuthenticated={isAuthenticated}/>
    );
}

export default AuthComponent;