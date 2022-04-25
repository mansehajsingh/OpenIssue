import React, { useState } from "react";
import Toolbar from "./Toolbar.js";
import EditorTextArea from "./EditorTextArea";
import EditorPreview from "./EditorPreview/index.js";
import styles from "./styles.module.scss";

const CustomEditor = ({
    margin = "0",
    height = "200px",
    value = "",
    onChange = (value) => {}
}) => {

    const [clickedTool, setClickedTool] = useState(null);
    const [previewActive, setPreviewActive] = useState(false);

    return (
        <>
        <div 
            className={styles.editor}
            style={{
                margin,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Toolbar 
                onToolClick={(t) => setClickedTool(t)}
                onPreviewChange={setPreviewActive}
            />
            {!previewActive ? (
                <EditorTextArea 
                    toolEvent={clickedTool}
                    onToolEventFired={() => setClickedTool(null)}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <EditorPreview 
                    value={value}
                />
            )}
            <div className={styles.attribution}>
                <p>Devwire Editor | © Mansehaj Singh 2022</p>
            </div>
        </div>
        </>
    )
}

export default CustomEditor;