import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIssue } from "../../../redux/slices/projectSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import FlairMenu from "../../FlairMenu";
import { FlairChip } from "../../FlairMenu";
import PriorityMenu from "../../PriorityMenu";
import CustomEditor from "../../CustomEditor";
import styles from "./styles.module.scss";

const CreateIssuePage = ({ isAuthenticated }) => { 

    const dispatch = useDispatch();
    const { project_id } = useParams();
    const navigate = useNavigate();
    const project = useSelector(state => state.project);
    const toast = useToast();

    const [formState, setFormState] = useState({
        title: "",
        flairs: [],
        priority: "low",
    });

    const [content, setContent] = useState("");

    useEffect(() => {
        if (project.issueCreationSuccess !== null) {
            if (project.issueCreationSuccess) {
                toast({
                    title: "Hooray!",
                    description: project.issueCreationMessage,
                    status: "success",
                    position: "top",
                    duration: 5000,
                    isClosable: true,
                });
                navigate(`/projects/${project_id}`);
            } else {
                toast({
                    title: "Oops",
                    description: project.issueCreationMessage,
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    }, [project]);

    const handleSubmit = () => {
        dispatch(createIssue({
            project_id,
            title: formState.title,
            content,
            flairs: formState.flairs,
            priority: formState.priority,
        }));
    }

    const handleTitleChange = (e) => {
        setFormState({
            ...formState,
            title: e.target.value,
        });
    }

    const handleFlairSelect = (value) => {
        if (formState.flairs.indexOf(value) === -1) {
            setFormState({
                ...formState,
                flairs: [...formState.flairs, value],
            });
        }
    }

    const handleFlairRemove = (value) => {
        if (formState.flairs.indexOf(value) > -1) {
            setFormState({
                ...formState,
                flairs: formState.flairs.filter(fl => fl !== value)
            });
        }
    }

    const handlePrioritySelect = (value) => {
        setFormState({
            ...formState,
            priority: value,
        })
    }

    const renderSelectedFlairs = () => {
        return formState.flairs.map((flair) => {
            return (
                <FlairChip
                    key={flair}
                    removable
                    onRemove={handleFlairRemove}
                    value={flair}
                    styles={{
                        margin: "11px 0 0 7px"
                    }}
                    fontSize="12px"
                />
            );
        });
    }

    return (
        <>
        <Navbar />
        <main className={styles.content}>
        <h1 className={styles.heading}>Create an Issue</h1>
            <form className={styles.issue_form}>
                <input
                    className={styles.title}
                    placeholder="Title"
                    onChange={handleTitleChange}
                    value={formState.title}
                />
                <div className={styles.flair_section}>
                    <FlairMenu 
                        onSelect={handleFlairSelect}
                    />
                    {renderSelectedFlairs()}
                </div>
                <PriorityMenu onChange={handlePrioritySelect}/>
                <CustomEditor
                    margin={"10px 0 0 0"}
                    value={content}
                    onChange={setContent}
                />
                <div className={styles.button_container}>
                    <button 
                        className={styles.create_button}
                        type="button"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                </div>
            </form>
        </main>
        <Footer />
        </>
    );
}

export default CreateIssuePage;