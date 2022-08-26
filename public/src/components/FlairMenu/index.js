import React from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const flairs = ["bug", "feature", "question", "announcement", "misc"];

const flairToColorHex = {
    "bug": "#ba0f3d",
    "feature": "#32c90c",
    "question": "#9966FF",
    "announcement": "#0e9ae6",
    "misc": "#d1ba0d",
};

const flairToColorRGBA = {
    "bug": "rgba(186, 15, 61, 0.1)",
    "feature": "rgba(50, 201, 12, 0.1)",
    "question": "rgba(153, 102, 255, 0.1)",
    "announcement": "rgba(14, 154, 230, 0.1)",
    "misc": "rgba(209, 186, 13, 0.1)",
};

const FlairMenu = ({ onSelect = (value) => {} }) => {

    const renderMenuItems = () => {
        return flairs.map(flair => {
            return (
                <MenuItem
                    key={flair}
                    bgColor={"#242526"}
                    color={"#FFF"}
                    _hover={{ bgColor: "#2a2d2e", color: "#FFF" }}
                    _active={{ bgColor: "#242526", color: "#FFF" }}
                    _focus={{ bgColor: "#242526", color: "#FFF" }}
                    onClick={() => onSelect(flair)}
                >
                    <FlairChip value={flair} fontSize="12px"/>
                </MenuItem>
            );
        });
    }

    return (
        <Menu>
            <MenuButton 
                as={Button} 
                rightIcon={<ChevronDownIcon />}
                bgColor={"#242526"}
                color={"#FFF"}
                _hover={{ textDecoration: "underline", bgColor: "#242526", color: "#FFF" }}
                _active={{ textDecoration: "underline", bgColor: "#242526", color: "#FFF" }}
                _focus={{border: "none"}}
            >
                Flairs
            </MenuButton>
            <MenuList
                bgColor={"#242526"}
                color={"#FFF"}
            >
                {renderMenuItems()}
            </MenuList>
        </Menu>
    )
}

export const FlairChip = ({ 
    value, 
    fontSize, 
    styles, 
    removable = false,
    onRemove = (value) => {}
}) => {
    return (
        <div 
            style={{
                backgroundColor: flairToColorRGBA[value],
                color: flairToColorHex[value],
                border: `solid 1px ${flairToColorHex[value]}`,
                borderRadius: "0px",
                padding: "0 10px 0 10px",
                fontSize: fontSize || "16px",
                fontWeight: "300px",
                height: "fit-content",
                userSelect: "none",
                ...styles,
            }}
        >
            {value}
            <span 
                onClick={() => removable && onRemove?.(value)}
                style={{ 
                    cursor: removable ? "pointer" : "",
                }}
            >
                    {removable ? "       ✕     " : ""}
            </span>
        </div>
    );
}

export default FlairMenu;