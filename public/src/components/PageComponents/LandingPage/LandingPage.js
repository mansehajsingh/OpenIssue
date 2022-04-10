import React, { useEffect, useRef } from "react";
import Navbar from "../../Navbar/Navbar";
import { useSelector } from 'react-redux';
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

/* component imports */
import LoginForm from "../../LoginForm";
import LandingInfoCard from "../../LandingInfoCard";
import Footer from "../../Footer";

const scrollToRefOnEvent = (ref) => {
    ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    })
}

const LandingPage = ({ isAuthenticated }) => {

    const user = useSelector((state) => state.user);
    const formRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        user.tokenCreated && navigate("/projects");
    }, [user.tokenCreated]);

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
                <button 
                    onClick={() => {
                        isAuthenticated
                        ? navigate("/projects")
                        : scrollToRefOnEvent(formRef);
                    }} 
                    className={styles.main_button}
                >
                    Take Our Hand
                </button>
            </section>
            <section ref={formRef} className={styles.form_wrapper}>
                {!isAuthenticated ? (
                    <LoginForm /> 
                ) : (
                    <h1 className={styles.welcome_tag}>Welcome back, {user.identity.first_name}{" "}
                        <span className={styles.handle}>@{user.identity.username}</span>
                    </h1>
                )}
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

LandingPage.propTypes = {
    isAuthenticated: PropTypes.bool,
}

export default LandingPage;