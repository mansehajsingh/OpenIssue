import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectsByUser } from '../../../redux/slices/projectsSlice';
import Navbar, { NavbarActiveItems } from '../../Navbar/Navbar';
import VerticalSpacer from "../../VerticalSpacer";
import ProjectCard from '../../ProjectCard';
import AddModal from '../../AddModal';
import { useDisclosure } from '@chakra-ui/react';
import PropTypes from  "prop-types";
import styles from "./styles.module.scss";

const ProjectsPage = ({ isAuthenticated }) => {

    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects);
    const user = useSelector((state) => state.user);

    const { isOpen: addModalIsOpen, 
            onOpen: onAddModalOpen,
            onClose: onAddModalClose 
        } = useDisclosure();

    useEffect(() => {
        if (isAuthenticated)
            dispatch(getProjectsByUser({ user_id: user.identity.id }));
    }, [isAuthenticated]);

    const renderProjects = () => {
        if (!projects.all) return null;
        return projects.all.map((project) => {
            return (
                <ProjectCard 
                    name={project.name}
                    description={project.description}
                    id={project.id}
                    owner={project.owner}
                    key={project.id}
                />
            );
        });
    }

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
                <ProjectCard 
                    isAddButton
                    addOnClick={onAddModalOpen}
                />
                {renderProjects()}
            </section>
        </main>
        <AddModal isOpen={addModalIsOpen} onClose={onAddModalClose}/>
        </>
    );

}

ProjectsPage.propTypes = {
    isAuthenticated: PropTypes.bool
}

export default ProjectsPage;