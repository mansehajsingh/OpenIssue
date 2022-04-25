import React, { useState, useRef, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import CodeEditorModal from "../CodeEditorModal";
import styles from "./styles.module.scss";

function surroundText(text, surroundWith, start, end) {
    return text.substring(0, start)
            + surroundWith
            + text.substring(start, end)
            + surroundWith
            + text.substring(end, text.length);
}

function surroundTextWithDifferent(text, left, right, start, end) {
    return text.substring(0, start)
            + left
            + text.substring(start, end)
            + right
            + text.substring(end, text.length);
}

function insertIntoText(text, insertText, index) {
    return text.substring(0, index)
            + insertText
            + text.substring(index, text.length);
} 

const EditorTextArea = ({
    toolEvent = null,
    onToolEventFired = () => {},
    value,
    onChange = (value) => {}
}) => {

    const { 
        isOpen: codeModalIsOpen,
        onOpen: codeModalOnOpen,
        onClose: codeModalOnClose,
    } = useDisclosure(); 

    const textRef = useRef(null);
    const [text, setText] = useState("");

    useEffect(() => {
        setText(value)
    }, []);

    useEffect(() => {
        onChange(text);
    }, [text]);

    useEffect(() => {
        if (toolEvent) {
            switch (toolEvent) {
                case "bold":
                    handleBoldEvent();
                    break;
                case "italic":
                    handleItalicEvent();
                    break;
                case "strikethrough":
                    handleStrikethroughEvent();
                    break;
                case "blockquote":
                    handleBlockquoteEvent();
                    break;
                case "code":
                    handleCodeEvent();
                    break;
                case "code block":
                    codeModalOnOpen();
                    break;
                case "ol":
                    handleOrderedListEvent();
                    break;
                case "ul":
                    handleUnorderedListEvent();
                    break;
                case "hyperlink":
                    handleHyperlink();
                    break;
                case "horizontal line":
                    handleHorizontalLineEvent();
                    break;
                case "h1":
                case "h2":
                case "h3":
                    handleSizeEvent(toolEvent);
                    break;
                default:
                    break;
            }
        }
        onToolEventFired();
    }, [toolEvent]);

    const handleKeyPressDefaults = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            setText(insertIntoText(text, "\t", textRef.current.selectionStart));
            e.target.selectionStart += 4;
            e.target.selectionEnd += 4;
        }
    }

    const handleBoldEvent = () => {
        setText(surroundText(text, "**", 
        textRef.current.selectionStart, textRef.current.selectionEnd));
    }

    const handleItalicEvent = () => {
        setText(surroundText(text, "*", 
        textRef.current.selectionStart, textRef.current.selectionEnd));
    }

    const handleStrikethroughEvent = () => {
        setText(surroundText(text, "~~", 
        textRef.current.selectionStart, textRef.current.selectionEnd));
    }

    const handleBlockquoteEvent = () => {
        setText(insertIntoText(text, "\n>", textRef.current.selectionStart))
    }

    const handleCodeEvent = () => {
        setText(surroundText(text, "`", 
        textRef.current.selectionStart, textRef.current.selectionEnd));
    }

    const handleCodeBlockEvent = (lang, code) => {
        setText(
            insertIntoText(
                text, 
                `\n\`\`\`${lang}\n${code}\n\`\`\``,
                textRef.current.selectionStart 
            )
        )
    }

    const handleOrderedListEvent = () => {
        setText(insertIntoText(text, "\n1. \n2. \n3. \n", textRef.current.selectionStart));
    }

    const handleUnorderedListEvent = () => {
        setText(insertIntoText(text, "\n+ \n+ \n+ \n", textRef.current.selectionStart));
    }

    const handleHyperlink = () => {
        setText(surroundTextWithDifferent(text, "[", "](your url here)",
        textRef.current.selectionStart, textRef.current.selectionEnd));
    }

    const handleHorizontalLineEvent = () => {
        setText(insertIntoText(text, "\n\n---", textRef.current.selectionStart));
    }

    const handleSizeEvent = (size) => {
        const toMD = { "h1": "#", "h2": "##", "h3": "###" };
        setText(insertIntoText(text, `\n${toMD[size]}`, textRef.current.selectionStart));
    }

    return (
        <>
        <textarea 
            className={styles.text_area}
            placeholder="Write some MarkDown..."
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPressDefaults}
        >
        </textarea>
        <CodeEditorModal 
            isOpen={codeModalIsOpen} 
            onClose={codeModalOnClose}
            onInsert={handleCodeBlockEvent}
        />
        </>
    )
}

export default EditorTextArea;