import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { Tooltip } from "@chakra-ui/react";
import { deleteReply } from "../../../redux/slices/replySlice";
import { getReplies } from '../../../redux/slices/issueSlice';
import styles from "./styles.module.scss";

const ReplyMessageBox = ({ reply, issue, user }) => {

    const dispatch = useDispatch();
    const replyState = useSelector((state) => state.reply);
    
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (replyState.replyDeletionSuccess === true && isMounted) {
            dispatch(getReplies({ 
                issue_id: issue.identity.id, 
                project_id: issue.identity.project.id 
            }));
        }
    }, [replyState.replyDeletionSuccess]);

    const renderDeleteButton = () => {
        if (
            issue?.identity?.project?.owner?.id === user?.identity?.id
            || reply.author.id === user?.identity?.id
        ) {
            return (
                <Tooltip label={"Delete Reply"}>
                    <button onClick={handleDeleteButtonClick} className={styles.delete_reply_button}>
                        <MdDelete width={10} height={10}/>
                    </button>
                </Tooltip>
            );
        }
        return null;
    }

    const handleDeleteButtonClick = () => {
        dispatch(deleteReply({
            project_id: issue.identity.project.id,
            issue_id: issue.identity.id,
            reply_id: reply.id,
        }));
    }

    return (
        <div className={styles.reply_container} key={reply.id}>
            <div className={styles.reply_author_container}>
                <p className={styles.reply_author}>
                    {reply.author.first_name + " " + reply.author.last_name}
                    <span>{" @" + reply.author.username}</span> replied&nbsp;
                </p>
                {renderDeleteButton()}
            </div>
            <p className={styles.reply_id_tag}>reply id: {reply.id}</p>
            <p className={styles.reply_content}>{reply.content}</p>
        </div>
    );
}

export default ReplyMessageBox;