import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProjectsByUser } from "../../redux/slices/projectsSlice";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast
} from '@chakra-ui/react';
import useIsMounted from "../../hooks/useIsMounted";
import styles from "./styles.module.scss";

const AddModal = ({
    isOpen,
    onClose
}) => {

    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects);
    const user = useSelector((state) => state.user);
    const isMounted = useIsMounted();

    const toast = useToast();

    const [formState, setFormState] = useState({
        name: "",
        description: "",
    });

    useEffect(() => {
        if (
            projects.projectCreationMessage && 
            projects.projectCreationSuccess !== null &&
            isMounted
        ) {
            if (projects.projectCreationSuccess) {
                toast({
                    title: "Hooray!",
                    description: projects.projectCreationMessage,
                    status: "success",
                    position: "top",
                    duration: 5000,
                    isClosable: true,
                });
                onClose();
            } else if (projects.projectCreationSuccess === false) {
                toast({
                    title: "Oops",
                    description: projects.projectCreationMessage,
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    }, [projects.projectCreationMessage]);

    useEffect(() => {
        if (projects.projectCreationSuccess) {
            dispatch(getProjectsByUser({
                user_id: user.identity.id
            }));
        }
    }), [projects.projectCreationSuccess];

    const handleFormInput = (e) => {
        if (e.target.name === "name" && e.target.value.length > 35)
            return;
        
        if (e.target.name === "description" && e.target.value.length > 150)
            return;

        setFormState({
            ...formState,
            [e.target.name]: e.target.value, 
        });
    }

    const handleSubmit = () => {
        dispatch(createProject({
            name: formState.name,
            description: formState.description,
        }));
    }

    const handleCancelClick = () => {
        setFormState({
            name: "",
            description: "",
        });
        onClose();
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            motionPreset="scale"
            size="lg"
            scrollBehavior="outside"
        >
            <ModalOverlay />
            <ModalContent
                bgColor="#242526"
                top="8rem"
                margin="0 10px"
            >
                <ModalHeader 
                    color="#FFF"
                    fontWeight="bold"
                    fontSize="30px"
                >
                    Create a Project
                </ModalHeader>
                <ModalCloseButton color="#FFF"/>
                <ModalBody>
                    <form onSubmit={e => { e.preventDefault(); }}>
                        <input 
                            className={styles.name_input}
                            placeholder="Project Name (required)"
                            name="name"
                            value={formState.name}
                            onChange={handleFormInput}
                            autoComplete="off"
                        />
                        <p className={styles.error_text}>
                            Characters remaining: {35 - formState.name.length}
                        </p>
                        <textarea
                            className={styles.desc_input}
                            rows={4}
                            placeholder="Use some big technical words that describe your project to impress your friends here. (optional)"
                            name="description"
                            value={formState.description}
                            onChange={handleFormInput}
                        />
                        <p className={styles.error_text}>
                            Characters remaining: {150 - formState.description.length}
                        </p>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button 
                        className={styles.create_button}
                        disabled={!formState.name}
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                    <button 
                        className={styles.cancel_button}
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddModal;