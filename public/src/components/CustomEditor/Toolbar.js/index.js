import React, { useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { 
    BsTypeBold, 
    BsTypeItalic, 
    BsTypeStrikethrough,
} from "react-icons/bs";
import { MdFormatQuote, MdLink } from "react-icons/md";
import { BiCodeAlt, BiCode } from "react-icons/bi";
import { 
    AiOutlineOrderedList, 
    AiOutlineUnorderedList, 
    AiFillEye,
    AiFillEyeInvisible
} from "react-icons/ai";
import { CgBorderStyleDotted } from "react-icons/cg";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import styles from "./styles.module.scss";

const Toolbar = ({
    onPreviewChange = (previewActive) => {},
    onToolClick = (tool) => {},
}) => {

    const [previewActive, setPreviewActive] = useState(false);

    const handleClick = (type) => () => onToolClick(type);

    return (
        <div className={styles.toolbar}>
            {!previewActive ? (
            <>
                <SizeDropDown onSelect={size => (handleClick(size))()}/>
                <ToolbarButton 
                    Icon={BsTypeBold} label="Bold"
                    onClick={handleClick("bold")}
                />
                <ToolbarButton 
                    Icon={BsTypeItalic} label="Italic"
                    onClick={handleClick("italic")}
                />
                <ToolbarButton 
                    Icon={BsTypeStrikethrough} label="Strikethrough"
                    onClick={handleClick("strikethrough")}
                />
                <ToolbarButton
                    Icon={MdFormatQuote} label="Blockquote"
                    onClick={handleClick("blockquote")}
                />
                <ToolbarButton 
                    Icon={BiCode} label="Code"
                    onClick={handleClick("code")}
                />
                <ToolbarButton 
                    Icon={BiCodeAlt} label="Code Block"
                    onClick={handleClick("code block")}
                />
                <ToolbarButton 
                    Icon={AiOutlineOrderedList} label="Ordered List"
                    onClick={handleClick("ol")}
                />
                <ToolbarButton 
                    Icon={AiOutlineUnorderedList} label="Unordered List"
                    onClick={handleClick("ul")}
                />
                <ToolbarButton 
                    Icon={MdLink} label="Hyperlink"
                    onClick={handleClick("hyperlink")}
                />
                <ToolbarButton 
                    Icon={CgBorderStyleDotted} label="Horizontal Line"
                    onClick={handleClick("horizontal line")}
                />
                <ToolbarButton Icon={AiFillEye} label="Preview" 
                    onClick={() => { 
                        setPreviewActive(true);
                        onPreviewChange(true);
                    }}
                />
            </>
            ) : (
                <ToolbarButton Icon={AiFillEyeInvisible} label="Disable Preview" 
                    onClick={() => {
                        setPreviewActive(false);
                        onPreviewChange(false);
                    }}
                />
            )}
        </div>
    );
}

const ToolbarButton = ({
    Icon = AiFillQuestionCircle,
    onClick = (e) => {},
    label="Tooltip",
}) => {
    return (
        <Tooltip label={label}>
            <button 
                className={styles.toolbar_button}
                type="button"
                onClick={onClick}
            >
                <Icon 
                    className={styles.toolbar_icon}
                />
            </button>
        </Tooltip>
    );
}

const SizeDropDown = ({
    onSelect = (size) => {}
}) => {
    return (
        <Menu>
            <MenuButton 
                as={Button} 
                rightIcon={<ChevronDownIcon />}
                style={{
                    fontSize: "9px",
                    height: "18px",
                    borderRadius: "2px",
                    marginRight: "5px",
                    backgroundColor: "#242526",
                    color: "#8a8a8a",
                    transition: "0.3s ease",
                }}
                _focus={{border: "none"}}
                _active={{border: "none"}}
            >
                Insert Size
            </MenuButton>
            <MenuList>
                <MenuItem
                    style={{fontSize: "16px", height: "30px", padding: "10px"}}
                    onClick={() => onSelect("h1")}
                >
                    Heading H1
                </MenuItem>
                <MenuItem
                    style={{fontSize: "14px", height: "30px", padding: "10px"}}
                    onClick={() => onSelect("h2")}
                >
                    Subheading H2
                </MenuItem>
                <MenuItem
                    style={{fontSize: "12px", height: "30px", padding: "10px"}}
                    onClick={() => onSelect("h3")}
                >
                    Subheading H3
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default Toolbar;