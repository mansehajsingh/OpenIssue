import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIssues, getMembers, getProject } from "../../../redux/slices/projectSlice";
import Navbar from "../../Navbar/Navbar";
import VerticalSpacer from "../../VerticalSpacer";
import MembersSection from "../../MembersSection";
import IssuesSection from "../../IssuesSection";
import { useToast } from "@chakra-ui/react";
import useIsMounted from "../../../hooks/useIsMounted";
import Footer from "../../Footer";
import styles from "./styles.module.scss";

const ProjectPage = ({
    isAuthenticated
}) => {

    const dispatch = useDispatch();
    const toast = useToast();
    const project = useSelector((state) => state.project);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const isMounted = useIsMounted();

    const { project_id } = useParams();

    useEffect(() => {
        dispatch(getProject({ project_id }));
        dispatch(getMembers({ project_id }));
        dispatch(getIssues({ project_id }));
    }, []);

    useEffect(() => {
        if (project.deleteMemberSuccess && isMounted) {
            dispatch(getMembers({ project_id }));
            toast({
                title: "Ouch",
                description: "Member kicked successfully.",
                status: "success",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [project.deleteMemberSuccess]);

    const goToAdminDashboard = () => {
        navigate(`/projects/${project_id}/admin`);
    }

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
                    <Link to={`/projects/${project_id}/create-issue`}>
                        <button
                            className={styles.new_button}
                        >
                            New
                        </button>
                    </Link>
                    {user?.identity?.id === project?.identity?.owner?.id && (
                        <button className={styles.admin_button} onClick={goToAdminDashboard}>Admin Dashboard</button>
                    )}
                </section>
                <section className={styles.project_content}>
                    <MembersSection isOwner={project?.identity?.owner?.id === user?.identity?.id}/>
                    <IssuesSection />
                </section>
            </section>
        </main>
        <Footer />
        </>
    );
}

export default ProjectPage;