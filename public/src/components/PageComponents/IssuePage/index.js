import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIssue, getReplies, createReply } from '../../../redux/slices/issueSlice';
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import VerticalSpacer from "../../VerticalSpacer";
import Footer from "../../Footer";
import PropTypes from  "prop-types";
import { BiArrowBack } from "react-icons/bi";
import { FlairChip } from '../../FlairMenu';
import styles from "./styles.module.scss";
import MarkdownView from '../../MarkdownView';

const priorityToText = {
    low: "Low ❤️‍🩹",
    medium: "Medium 💘",
    high: "High 💔",
    critical: "Critical ❤️‍🔥"
}

const IssuePage = () => {

    const { project_id, issue_id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const issue = useSelector((state) => state.issue);

    const [reply, setReply] = useState("");
    const [replyDisabled, setReplyDisabled] = useState(true);

    useEffect(() => {
        dispatch(getIssue({
            project_id, issue_id
        }));
        dispatch(getReplies({
            issue_id, project_id
        }));
    }, []);

    useEffect(() => {
        if (issue.replyCreationSuccess) {
            dispatch(getReplies({
                issue_id, project_id
            }));
            setReply("");
        }
        setReplyDisabled(true);
    }, [issue.replyCreationSuccess]);

    const redirectToProject = () => {
        navigate(`/projects/${project_id}`);
    }

    const handleReplyInput = (e) => {
        setReply(e.target.value);
        if (e.target.value.length >= 4 && e.target.value.length <= 5000) {
            setReplyDisabled(false);
            return;
        } 
        setReplyDisabled(true);
    }

    const makeReply = () => {
        dispatch(createReply({ issue_id, project_id, content: reply }));
    }

    const renderReplies = () => {
        if(issue.replies === null) return [];

        return issue.replies.map((reply) => {
            return (
                <div className={styles.reply_container} key={reply.id}>
                    <p className={styles.reply_author}>
                        {reply.author.first_name + " " + reply.author.last_name}
                        <span>{" @" + reply.author.username}</span> replied
                    </p>
                    <p className={styles.reply_id_tag}>reply id: {reply.id}</p>
                    <p className={styles.reply_content}>{reply.content}</p>
                </div>
            );
        });
    }

    const renderFlairs = () => {
        if (!issue.identity) return [];
        return issue.identity.flairs.map((flair) => {
            return (
                <FlairChip value={flair} fontSize="16px"/>
            );
        });
    }

    return(
        <>
        <title>Devwire</title>
        <Navbar/>
        <VerticalSpacer/>
        <main className={styles.content}>
            <section className={styles.centered_section}>
                <button 
                    className={styles.back_button}
                    onClick={redirectToProject}
                >
                    <BiArrowBack style={{ margin: "4px 5px 0 0" }}/> Back To Project
                </button>
                <div className={styles.header}>
                    <h2 className={styles.title}>{issue.identity?.title}</h2>
                </div>
                <p className={styles.status_tag}>
                    Status: 
                    <span className={issue.identity?.open ? styles.open_status : styles.closed_status}>
                        {issue.identity?.open ? " Open" : " Closed"}
                    </span>
                </p>
                <p className={styles.priority_tag}>
                    Priority: {priorityToText[issue?.identity?.priority]}
                </p>
                <div className={styles.flair_container}>
                    {renderFlairs()}
                </div>
                <p className={styles.author_tag}>
                    by {issue?.identity?.author?.first_name + " " 
                    + issue?.identity?.author?.last_name} 
                    <span> @{issue?.identity?.author?.username}</span>
                </p>
                <MarkdownView value={issue.identity?.content || ""}/>
                <form>
                    <textarea
                        className={styles.reply_textarea}
                        placeholder="Reply to this issue."
                        onChange={handleReplyInput}
                        value={reply}
                    />
                    <div className={styles.reply_button_wrapper}>
                        <button 
                            disabled={replyDisabled} 
                            className={styles.reply_button}
                            onClick={makeReply}
                            type="button"
                        >
                                Reply
                        </button>
                    </div>
                </form>
                <h5 className={styles.reply_heading}>Replies ({issue?.replies?.length || "0"})</h5>
                <section className={styles.replies_section}>
                    {renderReplies()}
                </section>
            </section>
        </main>
        <Footer />
        </>
    );

}

IssuePage.propTypes = {
    isAuthenticated: PropTypes.bool
}

export default IssuePage;