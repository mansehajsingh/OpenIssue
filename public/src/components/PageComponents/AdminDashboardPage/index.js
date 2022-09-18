import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProject, editProject } from "../../../redux/slices/projectSlice";
import { useToast } from "@chakra-ui/react";
import useIsMounted from "../../../hooks/useIsMounted";
import { BiArrowBack } from "react-icons/bi";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import NuclearForm from "../../NuclearForm";
import styles from "./styles.module.scss";

const AdminDashboardPage = ({}) => {

    const { project_id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = useIsMounted();
    const toast = useToast();

    const project = useSelector((state) => state.project);

    const [editFormState, setEditFormState] = useState({
        name: "",
        description: ""
    });

    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        dispatch(getProject({ project_id }));
    }, []);

    useEffect(() => {
        if (isMounted && project.identity) {
            setEditFormState({
                name: project.identity?.name,
                description: project.identity?.description,
            });
        }
    }, [project.identity]);

    useEffect(() => {
        if (isMounted && project.editProjectSuccess) {
            setDisableButton(false);
            dispatch(getProject({project_id}));
            toast({
                title: "Hooray!",
                description: "Project edited successfully.",
                status: "success",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [project.editProjectSuccess]);

    const redirectBackToProject = () => {
        navigate(`/projects/${project_id}`);
    }

    const handleFormChange = (e) => {
        if (e.target.name === "name" && e.target.value.length > 35) return;
        if (e.target.name === "description" && e.target.value.length > 150) return;

        setEditFormState({
            ...editFormState,
            [e.target.name]: e.target.value,
        });
    }

    const applyButtonIsDisabled = () => {
        if (!editFormState.name || !editFormState.description) return true;
        if (editFormState.name === project.identity?.name && editFormState.description === project.identity?.description) return true;
        return false;
    }

    const applyChanges = () => {
        setDisableButton(true);
        dispatch(editProject({
            project_id,
            name: editFormState.name,
            description: editFormState.description
        }));
    }

    return (
        <>
        <Navbar />
        <title>{editFormState.name} | Admin</title>
        <main className={styles.content}>
            <div className={styles.back_btn_wrapper}>
                <button 
                    className={styles.back_button}
                    onClick={redirectBackToProject}
                >
                    <BiArrowBack style={{ margin: "4px 5px 0 0" }}/> Back To Project
                </button>
            </div>
            <h1 className={styles.heading}>Admin Dashboard</h1>
            <form className={styles.edit_form} onSubmit={e => { e.preventDefault(); }}>
                <label className={styles.name_label}>Name</label>
                <input className={styles.name_input} name="name" value={editFormState.name} onChange={handleFormChange}/>
                <p className={styles.error_text}>Characters Remaining: {35 - editFormState.name.length}</p>
                <label className={styles.description_label}>Description</label>
                <textarea rows={8} className={styles.description_area} name="description" value={editFormState.description} onChange={handleFormChange}></textarea>
                <p className={styles.error_text}>Characters Remaining: {150 - editFormState.description.length}</p>
                <div className={styles.apply_button_wrapper}>
                    <button 
                        type="button" 
                        className={styles.apply_button}
                        disabled={applyButtonIsDisabled() || disableButton}
                        onClick={applyChanges}
                    >
                        Apply Changes
                    </button>
                </div>
                <NuclearForm />
            </form>
        </main>
        <Footer />
        </>
    );
}

export default AdminDashboardPage;