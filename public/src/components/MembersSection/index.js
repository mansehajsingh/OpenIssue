import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { GiWalkingBoot } from "react-icons/gi";
import { Tooltip } from "@chakra-ui/react";
import { deleteMember, getMembers } from "../../redux/slices/projectSlice";
import AddMemberModal from "../AddMemberModal";
import styles from "./styles.module.scss";

const MembersSection = ({ isOwner }) => {

    const project = useSelector((state) => state.project);
    const user = useSelector((state) => state.user);

    const { 
        isOpen: addMemberModalIsOpen,
        onOpen: addMemberModalOnOpen,
        onClose: addMemberModalOnClose,
    } = useDisclosure();

    const renderMembers = () => {
        return project.members.map((member) => {
            return (
                <MemberRow 
                    member={member} 
                    allowKick={project?.identity?.owner?.id === user?.identity?.id}
                />
            );
        });
    }

    return (
        <>
        <div className={styles.container}>
            <div className={styles.header}>
                <h4 className={styles.heading}>Members ({project?.members?.length})</h4>
                {isOwner && (
                    <MdPersonAddAlt1 
                        size={20} 
                        className={styles.add_button}
                        onClick={addMemberModalOnOpen}
                    />
                )}
            </div>
            <div className={styles.members_container}>
                {renderMembers()}
            </div>
        </div>
        <AddMemberModal 
            isOpen={addMemberModalIsOpen} 
            onClose={addMemberModalOnClose}
        />
        </>
    );
}

const MemberRow = ({ member, allowKick }) => {

    const dispatch = useDispatch();
    const { project_id } = useParams();
    const [isHovering, setIsHovering] = useState(false);

    const renderDeleteButton = () => {

        if (!isHovering || !allowKick)
            return null;

        return (
            <Tooltip label={"Kick"}>
                <button className={styles.remove_button} onClick={handleDeleteClick}>
                    <GiWalkingBoot style={{width:"0.75em"}}/>
                </button>
            </Tooltip>
        )
    }

    const handleDeleteClick = () => {
        dispatch(deleteMember({
            project_id,
            user_id: member.id,
        }));
    }
    
    return (
        <div 
            key={member.id} 
            className={styles.member_row}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <p className={styles.member_details}>
                {member.first_name + " " + member.last_name} <span className={styles.username_tag}>@{member.username}</span>
            </p>
            {renderDeleteButton()}
        </div>
    );
}

export default MembersSection;