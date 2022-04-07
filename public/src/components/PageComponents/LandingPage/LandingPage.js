import React from "react";
import Navbar, { NavbarActiveItems } from "../../Navbar/Navbar";
import styles from "./styles.module.scss";

const LandingPage = (props) => {
    return (
        <>
        <title>Home | Devwire</title> 
        <Navbar/>
        <main className={styles.content}>

        </main>
        </>
    );
}

export default LandingPage;