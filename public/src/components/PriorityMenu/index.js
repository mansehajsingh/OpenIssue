import React, { useState } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const priorities = ["low", "medium", "high", "critical"];

export const priorityToLabel = {
    "low": "Low ❤️‍🩹",
    "medium": "Medium 💘",
    "high": "High 💔",
    "critical": "Critical ❤️‍🔥 (use sparingly)",
}

const PriorityMenu = ({
    onChange = (value) => {},
    styles = {},
}) => {

    const [label, setLabel] = useState("Priority");

    const renderMenuItems = () => {
        let i = 1;
        return priorities.map((priority) => {
            return (
                <MenuItem
                    key={priority}
                    bgColor={"#242526"}
                    color={"#FFF"}
                    _hover={{ bgColor: "#2a2d2e", color: "#FFF" }}
                    _active={{ bgColor: "#242526", color: "#FFF" }}
                    _focus={{ bgColor: "#242526", color: "#FFF" }}
                    onClick={() => {
                        setLabel(priorityToLabel[priority]);
                        onChange(priority)
                    }}
                >
                    {priorityToLabel[priority] + " "}
                </MenuItem>
            );
        });
    }

    return (
        <Menu styles={styles}>
            <MenuButton 
                as={Button} 
                rightIcon={<ChevronDownIcon />}
                bgColor={"#242526"}
                color={"#FFF"}
                _hover={{ textDecoration: "underline", bgColor: "#242526", color: "#FFF" }}
                _active={{ textDecoration: "underline", bgColor: "#242526", color: "#FFF" }}
                _focus={{border: "none"}}
            >
                {label}
            </MenuButton>
            <MenuList
                bgColor={"#242526"}
                color={"#FFF"}
            >
                {renderMenuItems()}
            </MenuList>
        </Menu>
    );
}

export default PriorityMenu;