import { StylesProvider } from "@chakra-ui/react";
import React from "react";
import { BiTimeFive } from "react-icons/bi";
import styles from "./styles.module.scss";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getDateTimeString = (datestring) => {
    if (!datestring) return "";
    let date = new Date(datestring);
    let dateStrings = date.toLocaleDateString().split("/");
    let month = months[parseInt(dateStrings[0]) - 1];
    let time = date.toLocaleTimeString();
    return `${month} ${dateStrings[1]}, ${dateStrings[2]} ${time}`;
}

const Timestamp = ({
    time,
    fontSize = "12px",
    margin = "5px 0"
}) => {
    return (
        <div className={styles.wrapper} style={{ margin }}>
            <BiTimeFive 
                className={styles.icon}
            />
            <p className={styles.text} style={{ fontSize }}>
                {getDateTimeString(time)}
            </p>
        </div>
        
    );
}

export default Timestamp;