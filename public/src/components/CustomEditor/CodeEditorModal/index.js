import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,

    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import styles from "./styles.module.scss";

const menuItemsToLabels = {
    javascript: "JavaScript",
    jsx: "JSX",
    typescript: "TypeScript",
    css: "CSS",
    sass: "SCSS",
    html: "HTML",
    json: "JSON",
    java: "Java",
    python: "Python",
    sql: "SQL",
    rust: "Rust",
    golang: "Go",
    csharp: "C#",
    ruby: "Ruby",
    c: "C",
    cpp: "C++",
}

const CodeEditorModal = ({ 
    isOpen,
    onClose,
    onInsert,
}) => {

    const [language, setLanguage] = useState("javascript"); 
    const [code, setCode] = useState("");

    useEffect(() => {
        setLanguage("javascript")
        setCode("")
    }, [])

    const renderMenuItems = () => {
        let MenuItems = []
        for (const menuItem in menuItemsToLabels) {
            MenuItems.push((
                <MenuItem 
                    key={menuItem}
                    style={{
                        backgroundColor: "#242526",
                        color: "#FFF",
                        fontSize: "10px",
                        height: "fit-content"
                    }}
                    onClick={() => setLanguage(menuItem)}
                >
                    {menuItemsToLabels[menuItem]}
                </MenuItem>
            ));
        }
        return MenuItems; 
    }

    return (
        <>
        <Modal 
            isOpen={isOpen} onClose={onClose}
            scrollBehavior="outside"
            size={"2xl"}
        >
            <ModalOverlay />
            <ModalContent
                bgColor="#242526"
            >
                <ModalHeader>
                    <h1 className={styles.heading}>
                        Insert Code Block
                    </h1>
                </ModalHeader>
                <ModalCloseButton color="#FFF"/>
                <ModalBody>
                    <div className={styles.select_wrapper}>
                        <Menu>
                            <MenuButton  
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                style={{
                                    backgroundColor: "#242526",
                                    color: "#FFF",
                                    fontSize: "12px",
                                    height: "30px"
                                }}
                            >
                                {menuItemsToLabels[language]}
                            </MenuButton>
                            <MenuList bgColor={"#242526"}>
                                {renderMenuItems()}
                            </MenuList>
                        </Menu>
                    </div>
                    <AceEditor
                        mode={language}
                        theme="monokai"
                        width="100%"
                        height="300px"
                        fontSize={14}
                        value={code}
                        onChange={setCode}
                    />
                </ModalBody>
                <ModalFooter>
                    <button 
                        className={styles.insert_button}
                        onClick={() => {
                            onInsert(language, code);
                            onClose();
                        }}
                    >
                        Insert
                    </button>
                    <button 
                        className={styles.cancel_button}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
}

export default CodeEditorModal;