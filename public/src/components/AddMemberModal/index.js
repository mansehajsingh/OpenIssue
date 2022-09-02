import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { queryUsers } from "../../redux/slices/userSlice";
import { addMember, getMembers } from "../../redux/slices/projectSlice";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";

const AddMemberModal = ({
    isOpen,
    onClose
}) => {

    let typingTimeout = null;

    const dispatch = useDispatch();
    const queriedUsers = useSelector((state) => state.user.queriedUsers);
    const projectMembers = useSelector((state) => state.project.members);
    const project = useSelector((state) => state.project);

    const { project_id } = useParams();
    
    const [displayUsers, setDisplayUsers] = useState([])

    const [selectedUserID, setSelectedUserID] = useState(null);

    const [formState, setFormState] = useState({
        username: "",
    });

    useEffect(() => {
        setFormState({
            username: "",
        });
        setDisplayUsers([]);
        setSelectedUserID(null);
    }, [isOpen])

    useEffect(() => {
        setDisplayUsers(queriedUsers);
    }, [queriedUsers])


    useEffect(() => {
        if (formState.username.length >= 4) {
            setSelectedUserID(null);
            typingTimeout = setTimeout(() => {
                dispatch(queryUsers({
                    username: formState.username,
                }))
            }, 500);
        }
    }, [formState.username])

    useEffect(() => {
        if (project.addMemberSuccess === true) {
            dispatch(getMembers({
                project_id: project_id,
            }));
            onClose();
        }
    }, [project.addMemberSuccess])

    const handleFormInput = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    }

    const renderUsers = () => {
        return displayUsers.filter((user) => {
            return projectMembers.every((member) => member.id !== user.id)
                   && project.identity.owner.id !== user.id;
        }).map((user) => {
            return (
                <div 
                    key={user.id} 
                    className={selectedUserID === user.id ? 
                               styles.member_row_selected :
                               styles.member_row}
                    onClick={handleUserSelect(user.id)}
                >
                    <p>{user.first_name + " " + user.last_name} <span className={styles.username_tag}>@{user.username}</span></p>
                </div>
            );
        });
    }

    const handleUserSelect = (ID) => () => {
        if (ID === selectedUserID) {
            setSelectedUserID(null);
            return;
        }
        setSelectedUserID(ID);
    }

    const handleSubmit = () => {
        dispatch(addMember({
            projectID: project_id,
            userID: selectedUserID
        }));
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
                    Add a Member
                </ModalHeader>
                <ModalCloseButton color="#FFF"/>
                <ModalBody>
                    <form>
                        <input 
                            className={styles.username_input}
                            placeholder="Username"
                            name="username"
                            value={formState.username}
                            onChange={handleFormInput}
                            autoComplete="off"
                        />
                        <p className={styles.error_text}>
                            Type at least 4 characters.
                        </p>
                        <section className={styles.query_results_section}>
                            {renderUsers()}
                        </section>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button 
                        className={styles.add_button}
                        disabled={!selectedUserID}
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddMemberModal;