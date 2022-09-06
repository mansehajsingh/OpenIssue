import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIssue, getReplies, createReply, changeIssueStatus, deleteIssue } from '../../../redux/slices/issueSlice';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import styles from "./styles.module.scss";
import ConfirmationModal from '../../ConfirmationModal';
import { ChevronDownIcon } from '@chakra-ui/icons';

const ActionsMenu = ({ }) => {
    const { project_id, issue_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const issue = useSelector((state) => state.issue);
    const user = useSelector((state) => state.user);

    const [isMounted, setIsMounted] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => setIsMounted(true), [])

    useEffect(() => {
        dispatch(getIssue({
            issue_id, project_id
        }));
    }, [issue.issueStatusChangeFlag]);

    useEffect(() => {
        if (issue.issueDeletionSuccess && isMounted) {
            navigate(`/projects/${project_id}`);
        }
    }, [issue.issueDeletionSuccess]);

    const issueStatusChangeOnClick = () => {
        dispatch(changeIssueStatus({
            issue_id, project_id, newStatus: !issue?.identity?.open
        }));
    }

    const issueDeletionOnClick = () => {
        dispatch(deleteIssue({
            project_id, issue_id
        }));
    }

    if (
        issue?.identity?.author?.id !== user?.identity?.id
        && issue?.identity?.project?.owner?.identity !== user?.identity?.id
    ) {
        return null;
    }

    return (
        <>
            <Menu>
                <MenuButton 
                    as={Button} 
                    rightIcon={<ChevronDownIcon />}
                    color={"#FFF"}
                    bg={"#242526"}
                    width={"120px"}
                    border={"solid 1px #3a3a3a"}
                    margin={"0 0 10px 0"}
                    _hover={{ bg: "#242526" }}
                    _focus={{outline:"none"}}
                    _active={{outline:"none"}}
                >
                    Actions
                </MenuButton>
                <MenuList bg={"#242526"} border={"solid 1px #3a3a3a"}>
                    <MenuItem
                        _hover={{ bg: "#242526", textDecoration: "underline" }}
                        color={"#FFF"}
                        onClick={issueStatusChangeOnClick}
                    >
                        {issue.identity?.open ? "Close" : "Open"} this issue.
                    </MenuItem>
                    <MenuItem
                        color={"#FFF"}
                        _hover={{ bg: "#242526", textDecoration: "underline" }}
                        onClick={onOpen}
                    >
                        Delete this issue.
                    </MenuItem>
                    {issue?.identity?.author?.id === user?.identity?.id &&
                        (
                            <MenuItem
                                color={"#FFF"}
                                _hover={{ bg: "#242526", textDecoration: "underline" }}
                            >
                                Edit this issue.
                            </MenuItem>
                        )
                    }
                </MenuList>
            </Menu>
            <ConfirmationModal 
                text="Are you sure you want to delete this issue?"
                isOpen={isOpen}
                onClose={onClose}
                action={issueDeletionOnClick}
                buttonText="Delete"
            />
        </>
    );
}

export default ActionsMenu;