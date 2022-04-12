import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const ProjectCard = ({
    name = "Name",
    description = "Description",
    owner = null,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.inner_content}>
                <h4 className={styles.name}>{name}</h4>
                <p className={styles.desc}>{description}</p>
            </div>
        </div>
    );
}

ProjectCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.object,
}

export default ProjectCard;