import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import styles from "./styles.module.scss";

const MembersSection = ({}) => {

    const project = useSelector((state) => state.project);

    const renderMembers = () => {
        return project.members.map((member) => {
            return (
                <div key={member.id} className={styles.member_row}>
                    <p>{member.first_name + " " + member.last_name} <span className={styles.username_tag}>@{member.username}</span></p>
                </div>
            );
        });
    }

    return (
        <>
        <div className={styles.container}>
            <div className={styles.header}>
                <h4 className={styles.heading}>Members</h4>
            </div>
            <div className={styles.members_container}>
                {renderMembers()}
            </div>
        </div>
        </>
    );
}

export default MembersSection;