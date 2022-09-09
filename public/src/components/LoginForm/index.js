import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginUser } from "../../redux/slices/userSlice";
import { useToast } from '@chakra-ui/react'
import useIsMounted from "../../hooks/useIsMounted";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

function toUsernameErrorText(username) {
    let message = "";

    (username.length < 4 || username.length > 20) &&
    (message = "Username must be between 4 and 20 characters (inclusive).");

    (username && !username.match(/^[a-zA-Z0-9_]+$/)) && 
    (message = "Username must only contain letters, numbers, and/or underscores");

    return message;
}

function toNameErrorText(firstName, lastName) {
    let message = "";

    (!firstName) &&
    (message = "First name is a required field.");

    (lastName.length > 20) &&
    (message = "Last name cannot be more than 20 characters.");

    (firstName.length > 20) &&
    (message = "First name cannot be more than 20 characters.");

    return message;
}

function toPasswordErrorText(password) {
    let message = "";

    (password.length < 6 || password.length > 30) &&
    (message = "Password must be between 6 and 30 characters (inclusive).");

    return message;
}

function inputsAreValid(username, firstname, lastname, password) {
    if (toUsernameErrorText(username)) return false;
    if (toNameErrorText(firstname, lastname)) return false;
    if (toPasswordErrorText(password)) return false;
    return true; 
}

const LoginForm = ({ isAuthenticated }) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const toast = useToast();
    
    const isMounted = useIsMounted();

    const [activeForm, setActiveForm] = useState("login");

    const [loginFields, setLoginFields] = useState({
        username: "",
        password: "",
    });

    const [registerFields, setRegisterFields] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    const [errorTexts, setErrorTexts] = useState({
        username: "",
        firstName: "",
        lastName: "",
    });
    
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

    useEffect(() => {
        if (user.userCreated) {
            dispatch(loginUser({
                username: registerFields.username,
                password: registerFields.password,
            }));
        }
    }, [user.userCreated]);

    useEffect(() => {
        inputsAreValid(
            registerFields.username,
            registerFields.firstName,
            registerFields.lastName,
            registerFields.password,
        ) ? setButtonDisabled(false) : setButtonDisabled(true);
    }, [registerFields]);

    useEffect(() => {
        activeForm === "signup" &&
        setErrorTexts({
            ...errorTexts,
            username: toUsernameErrorText(registerFields.username),
        });
    }, [registerFields.username]);

    useEffect(() => {
        activeForm === "signup" &&
        setErrorTexts({
            ...errorTexts,
            firstName: toNameErrorText(registerFields.firstName, registerFields.lastName),
        });
    }, [registerFields.firstName, registerFields.lastName]);

    useEffect(() => {
        activeForm === "signup" &&
        setErrorTexts({
            ...errorTexts,
            password: toPasswordErrorText(registerFields.password),
        });
    }, [registerFields.password]);

    useEffect(() => {
        if (loginFields.username && loginFields.password) setLoginButtonDisabled(false);
        else setLoginButtonDisabled(true);
    }, [loginFields.username, loginFields.password]);

    useEffect(() => {
        if (user.userLoginResponse && isMounted) {
            setLoginButtonDisabled(false);
            toast({
                title: "Oops....",
                description: user.userLoginResponse,
                status: "error",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [user.userLoginResponse]);

    
    useEffect(() => {
        if (user.userCreationResponse && isMounted) {
            toast({
                title: "Sorry to tell you this but....",
                description: user.userCreationResponse,
                status: "error",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [user.userCreationResponse]);

    const handleLoginFields = (e) => {
        setLoginFields({
            ...loginFields,
            [e.target.name]: e.target.value 
        });
    }

    const handleRegisterFields = (e) => {
        setRegisterFields({
            ...registerFields,
            [e.target.name]: e.target.value
        });
    }

    const handleSignUpSubmit = (e) => {
        if ((e && e.key === "Enter" && !buttonDisabled) || e.type === "click") {
            setButtonDisabled(true);
            dispatch(createUser({
                username: registerFields.username, 
                firstName: registerFields.firstName,
                lastName: registerFields.lastName,
                password: registerFields.password,
            }));
        }
    }

    const handleLoginSubmit = (e) => {
        if ((e && e.key === "Enter" && !loginButtonDisabled) || e.type === "click") {
            if(loginFields.username && loginFields.password) {
                setLoginButtonDisabled(true);
                dispatch(loginUser({
                    username: loginFields.username,
                    password: loginFields.password,
                }))
            }
        }
    }

    const renderLogin = () => {
        return (
            <>
            <h2 className={styles.heading}>Login</h2>
            <input
                className={styles.username} 
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleLoginFields}
                value={loginFields.username}
                style={{marginBottom:"20px"}}
            />
            <input
                className={styles.password} 
                type="password" 
                placeholder="Password"
                name="password"
                onChange={handleLoginFields}
                onKeyDown={handleLoginSubmit}
                value={loginFields.password}
                style={{marginBottom:"20px"}}
            />
            <p className={styles.helper_text}>
                Don't have an account?{" "}
                <span 
                    className={styles.helper_tag}
                    onClick={() => setActiveForm("signup")}
                >Sign Up.</span>
            </p>
            <button 
                type="button" 
                className={styles.submit_button}
                disabled={loginButtonDisabled}
                onClick={handleLoginSubmit}
            >
                Login
            </button>
            </>
        );
    }

    const renderSignUp = () => {
        return (
            <>
            <h2 className={styles.heading}>Sign Up</h2>
            <input 
                className={styles.username} 
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleRegisterFields}
                value={registerFields.username}
                style={{marginBottom:"5px"}}
            />
            <p className={styles.error_text}>{errorTexts.username}</p>
            <div 
                style={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "5px",
                }}
            >
                <input 
                    className={styles.first_name} 
                    type="text"
                    placeholder="First"
                    name="firstName"
                    onChange={handleRegisterFields}
                    value={registerFields.firstName}
                />
                <input 
                    className={styles.last_name} 
                    type="text"
                    placeholder="Last"
                    name="lastName"
                    onChange={handleRegisterFields}
                    value={registerFields.lastName}
                />
            </div>
            <p className={styles.error_text}>{errorTexts.firstName}</p>
            <input
                className={styles.password} 
                type="password" 
                placeholder="Password"
                name="password"
                onChange={handleRegisterFields}
                value={registerFields.password}
                style={{marginBottom:"5px"}}
                onKeyDown={handleSignUpSubmit}
            />
            <p className={styles.error_text}>{errorTexts.password}</p>
            <p className={styles.helper_text}>
                Already have an account?{" "}
                <span 
                    className={styles.helper_tag}
                    onClick={() => setActiveForm("login")}
                >Login.</span>
            </p>
            <button 
                disabled={buttonDisabled} 
                type="button" 
                className={styles.submit_button}
                onClick={handleSignUpSubmit}
            >
                Sign Up
            </button>
            </>
        );
    }

    return (
        <form className={styles.form}>
            {activeForm === "login" && renderLogin()}
            {activeForm === "signup" && renderSignUp()}
        </form>
    );
}

LoginForm.propTypes = {
    isAuthenticated: PropTypes.bool,
}

export default LoginForm;