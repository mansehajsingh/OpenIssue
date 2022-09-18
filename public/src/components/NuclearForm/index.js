import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { deleteProject, transferProject } from "../../redux/slices/projectSlice";
import { useNavigate, useParams } from "react-router-dom";
import useIsMounted from "../../hooks/useIsMounted";
import { AiTwotoneExperiment } from "react-icons/ai";
import ConfirmationModal from "../ConfirmationModal";
import styles from "./styles.module.scss";

const NuclearForm = ({}) => {

    const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();

    const { isOpen: transferIsOpen, onOpen: transferOnOpen, onClose: transferOnClose } = useDisclosure();

    const [selectedTransfer, setSelectedTransfer] = useState(null);

    const navigate = useNavigate();

    const project = useSelector((state) => state.project);
    const isMounted = useIsMounted();

    const toast = useToast();

    const { project_id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        if (isMounted && project.deleteProjectSuccess) {
            toast({
                title: "Hooray!",
                description: "Project deleted successfully.",
                status: "success",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
            navigate("/projects");
        }
    }, [project.deleteProjectSuccess]);

    useEffect(() => {
        if (isMounted && project.transferProjectSuccess) {
            toast({
                title: "Hooray!",
                description: "Project transferred successfully.",
                status: "success",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
            navigate(`/projects/${project_id}`);
        }
    }, [project.transferProjectSuccess]);

    const deleteOnClick = () => {
        dispatch(deleteProject({ project_id }));
    }

    const transferOnClick = () => {
        dispatch(transferProject({ project_id, new_owner_id: selectedTransfer.id }));
    }

    const renderMembers = () => {
        if (!project.members) return null;
        return project.members.map((member) => {
            return (
                <p 
                    className={styles.member_tag}
                    onClick={() => {
                        setSelectedTransfer(member);
                        transferOnOpen();
                    }}
                >
                    to <span>@{member.username}</span> {member.first_name} {member.last_name}
                </p>
            );
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.heading_wrapper}>
                <AiTwotoneExperiment className={styles.icon} />
                <h2 className={styles.heading}>Nuclear Zone</h2>
            </div>
            <p className={styles.subheading}>This stuff is <b>not reversible</b>.</p>
            <button 
                className={styles.delete_button}
                onClick={() => deleteOnOpen()}
            >
                    Delete Project
            </button>
            <ConfirmationModal 
                text="Are you absolutely sure you want to delete this project? (this action is not reversible)"
                buttonText="Delete"
                isOpen={deleteIsOpen}
                onClose={deleteOnClose}
                action={deleteOnClick}
            />
            <div className={styles.transfer_container}>
                <h3 className={styles.transfer_heading}>Transfer Ownership</h3>
                <div className={styles.members_container}>
                    {renderMembers()}
                </div>
            </div>
            <ConfirmationModal 
                text={`Are you absolutely sure you want to transfer this project to @${selectedTransfer?.username}?`}
                buttonText="Transfer"
                isOpen={transferIsOpen}
                onClose={transferOnClose}
                action={transferOnClick}
            />
        </div>
    );

}

export default NuclearForm;