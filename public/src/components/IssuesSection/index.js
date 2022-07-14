import React from "react";
import { useSelector } from "react-redux";
import IssueRow from "./IssueRow";
import styles from "./styles.module.scss";

const IssuesSection = ({}) => {
    const project = useSelector((state) => state.project);

    const renderIssues = () => {
        let issuesToRender = [];
        let numOfOpenIssues = 0;

        project.issues.forEach((issue) => {
            if (issue.open === false) return;
            issuesToRender.unshift(
                <IssueRow key={issue.id} issue={issue}/>
            );
            numOfOpenIssues++;
        });

        project.issues.forEach((issue) => {
            if (issue.open === true) return;
            issuesToRender.splice(
                numOfOpenIssues, 
                0,
                <IssueRow key={issue.id} issue={issue}/>
            );
        });


        return issuesToRender;
    }

    return (
        <>
        <div className={styles.container}>
            <div className={styles.header}>
                <h4 className={styles.heading}>Issues</h4>
            </div>
            <div className={styles.issues_container}>
                {renderIssues()}
            </div>
        </div>
        </>
    );
}

export default IssuesSection;