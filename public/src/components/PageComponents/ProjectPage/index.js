import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import { getMembers, getProject } from "../../../redux/slices/projectSlice";
import Navbar from "../../Navbar/Navbar";
import VerticalSpacer from "../../VerticalSpacer";
import MembersSection from "../../MembersSection";
import Footer from "../../Footer";
import CreateIssueModal from "../../CreateIssueModal";
import styles from "./styles.module.scss";

const ProjectPage = ({
    isAuthenticated
}) => {

    const dispatch = useDispatch();
    const project = useSelector((state) => state.project);
    const user = useSelector((state) => state.user);

    const { 
        isOpen: issueModalIsOpen, 
        onOpen: issueModalOnOpen,
        onClose: issueModalOnClose,
    } = useDisclosure();

    const { project_id } = useParams();

    useEffect(() => {
        dispatch(getProject({ project_id }));
        dispatch(getMembers({ project_id }));
    }, []);

    return (
        <>
        <title>
            {
            project?.identity?.name
                ? project?.identity?.name + " | Devwire"
                : "Loading..."
            }
        </title>
        <Navbar />
        <VerticalSpacer />
        <main className={styles.content}>
            <section className={styles.main_container}> 
                <section className={styles.details_container}>
                    <h1 className={styles.project_name}>
                        {project?.identity?.name}
                    </h1>
                    <p className={styles.owner_tag}>
                        by{" "}
                        {project?.identity?.owner?.first_name + " "}
                        {project?.identity?.owner?.last_name + " "}
                        <span>@{project?.identity?.owner?.username}</span>
                    </p>
                    <p className={styles.description}>{project?.identity?.description}</p>
                </section>
                <section className={styles.buttons_container}>
                    <button 
                        className={styles.new_button}
                        onClick={issueModalOnOpen}
                    >
                        New
                    </button>
                    {user?.identity?.id === project?.identity?.owner?.id && (
                        <button className={styles.admin_button}>Admin Dashboard</button>
                    )}
                </section>
                <section className={styles.project_content}>
                    <MembersSection isOwner={project?.identity?.owner?.id === user?.identity?.id}/>
                </section>
            </section>
        </main>
        <CreateIssueModal isOpen={issueModalIsOpen} onClose={issueModalOnClose}/>
        <Footer />
        </>
    );
}

export default ProjectPage;