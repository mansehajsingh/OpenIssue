import React from "react";
import Navbar from "../../Navbar/Navbar";
import VerticalSpacer from "../../VerticalSpacer";
import Footer from "../../Footer";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const codeToExplanation = {
    401: "Unauthorized." 
};

const ErrorPage = ({
    code = 401
}) => {

    return (
        <>
            <Navbar/>
            <VerticalSpacer/>
            <title>Error</title>
            <div className={styles.content}>
                <h1 className={styles.code_heading}>{code}</h1>
                <h2 className={styles.subheading}>{codeToExplanation[code]} Back to <Link to="/" >home</Link>.</h2>
            </div>
            <Footer />
        </>
    );

}

export default ErrorPage;