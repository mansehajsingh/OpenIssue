import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIssue } from '../../../redux/slices/issueSlice';
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import VerticalSpacer from "../../VerticalSpacer";
import Footer from "../../Footer";
import PropTypes from  "prop-types";
import styles from "./styles.module.scss";
import MarkdownView from '../../MarkdownView';

const IssuePage = () => {

    const { project_id, issue_id } = useParams();
    const dispatch = useDispatch();

    const issue = useSelector((state) => state.issue);

    useEffect(() => {
        dispatch(getIssue({
            project_id, issue_id
        }));
    }, []);

    useEffect(() => {
        console.log(issue.identity);
    }, [issue.identity]);

    return(
        <>
        <title>Devwire</title>
        <Navbar/>
        <VerticalSpacer/>
        <main className={styles.content}>
            <div className={styles.header}>
                <h2 className={styles.title}>{issue.identity?.title}</h2>
            </div>
            <p className={styles.author_tag}>
                by {issue?.identity?.author?.first_name + " " 
                   + issue?.identity?.author?.last_name} 
                   <span> @{issue?.identity?.author?.username}</span>
            </p>
            <MarkdownView value={issue.identity?.content || ""}/>
        </main>
        <Footer />
        </>
    );

}

IssuePage.propTypes = {
    isAuthenticated: PropTypes.bool
}

export default IssuePage;