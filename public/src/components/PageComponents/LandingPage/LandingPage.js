import React from "react";
import Navbar, { NavbarActiveItems } from "../../Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

/* component imports */
import LandingInfoCard from "../../LandingInfoCard";
import Footer from "../../Footer";

const LandingPage = (props) => {

    return (
        <>
        <title>Home | Devwire</title> 
        <Navbar/>
        <main className={styles.content}>
            <section className={styles.landing_image}>
                <img 
                    className={styles.main_logo}
                    src="../../../../content/images/devwire_logo_white.svg"
                    draggable="false"
                />
                <Link to="/" className={styles.main_button}>Take Our Hand</Link>
            </section>
            <section className={styles.info_container}>
                <LandingInfoCard 
                    imagePath="../../../../content/images/connect.svg"
                    imageAlignment="right"
                    heading="Connect"
                    content="Colloborate and communicate with a network of other developers."
                    bgColor="#242526"
                    buttonText="Learn More"
                    buttonProps={{
                        style: {
                            color: "#FFF",
                            backgroundColor: "#9966ff",
                        },
                    }}
                />
                <LandingInfoCard 
                    imagePath="../../../../content/images/design_icon.svg"
                    imageAlignment="left"
                    heading="Design"
                    content="Deploy innovative new projects and platforms accessible to a global community."
                    bgColor="#272829"
                    buttonText="Start Building"
                    buttonProps={{
                        style: {
                            color: "#FFF",
                            backgroundColor: "#0784B5", 
                        }
                    }}
                />
                <LandingInfoCard 
                    imagePath="../../../../content/images/calendar.svg"
                    imageAlignment="right"
                    heading="Organize"
                    content="Manage workflows, issues, and feature updates all in one."
                    bgColor="#242526"
                    buttonText="Get In Control"
                    buttonProps={{
                        style: {
                            color: "#FFF",
                            backgroundColor: "#059862",
                        },
                    }}
                />
            </section>
        </main>
        <Footer/>
        </>
    );
}

export default LandingPage;