import React from "react";
import { useDispatch } from "react-redux";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
} from '@chakra-ui/react';
import styles from "./styles.module.scss";


const ConfirmationModal = ({
    text,
    buttonText,
    action,
    isOpen,
    onClose
}) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            motionPreset="scale"
            size="md"
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
                    {text}
                </ModalHeader>
                <ModalCloseButton color="#FFF"/>
                <ModalFooter
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <button 
                        className={styles.risk_button} 
                        onClick={() => {
                            onClose();
                            action();
                        }}
                    >
                        {buttonText}
                    </button>
                    <button className={styles.cancel_button} onClick={() => onClose()}>Cancel</button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ConfirmationModal;