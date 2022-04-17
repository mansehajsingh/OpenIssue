import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIssue } from "../../redux/slices/projectSlice";
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
import FlairMenu from "../FlairMenu";
import { FlairChip } from "../FlairMenu";
import PriorityMenu from "../PriorityMenu";
import CustomEditor from "../CustomEditor";
import styles from "./styles.module.scss";

const CreateIssueModal = ({
    isOpen,
    onClose
}) => { 

    const [formState, setFormState] = useState({
        title: "",
        flairs: [],
    });

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
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            motionPreset="scale"
            size="full"
            scrollBehavior="outside"
        >
            <ModalOverlay />
            <ModalContent
                top="10px"
                bgColor="#242526"
                margin="0 10px"
            >
                <ModalHeader 
                    color="#FFF"
                    fontWeight="bold"
                    fontSize="30px"
                >
                    Create an Issue
                </ModalHeader>
                <ModalCloseButton color="#FFF"/>
                <ModalBody>
                    <form>
                        <input
                            className={styles.title}
                            placeholder="Title"
                        />
                        <div className={styles.flair_section}>
                            <FlairMenu 
                                onSelect={handleFlairSelect}
                            />
                            {renderSelectedFlairs()}
                        </div>
                        <PriorityMenu />
                        <CustomEditor />
                    </form>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CreateIssueModal;