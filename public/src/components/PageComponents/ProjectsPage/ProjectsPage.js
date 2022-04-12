import React, { useState, useEffect } from 'react';
import Navbar, { NavbarActiveItems } from '../../Navbar/Navbar';
import VerticalSpacer from "../../VerticalSpacer";
import ProjectCard from '../../ProjectCard';
import PropTypes from  "prop-types";
import styles from "./styles.module.scss";

const ProjectsPage = ({ isAuthenticated }) => {

    return(
        <>
        <title>Projects | Devwire</title>
        <Navbar activeItem={NavbarActiveItems.Project}/>
        <VerticalSpacer/>
        <main className={styles.content }>
            <div className={styles.header}>
                <h2 className={styles.title}>Projects</h2>
            </div>
            <section className={styles.project_card_container}>
                <ProjectCard />
            </section>
        </main>
        </>
    );

}

ProjectsPage.propTypes = {
    isAuthenticated: PropTypes.bool
}

export default ProjectsPage;