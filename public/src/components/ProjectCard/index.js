import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { IoMdAdd } from "react-icons/io"
import styles from "./styles.module.scss";

const ProjectCard = ({
    name = "Name",
    description = "Description",
    id = null,
    owner = null,
    isAddButton = false,
    addOnClick = null
}) => {

    const navigate = useNavigate();

    const [addIconColor, setAddIconColor] = useState("#FFF");

    const handleClick = () => id && navigate(`${id}`);

    return (
        !isAddButton ? ( 
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.inner_content}>
                <h4 className={styles.name}>{name}</h4>
                <p className={styles.owner}>
                    by {`${owner.first_name} ${owner.last_name} `}
                    <span>@{owner.username}</span>
                </p>
                <p className={styles.desc}>{description}</p>
            </div>
        </div>
        ) : (
            <div className={styles.container} onClick={addOnClick}>
                <IoMdAdd
                    color={addIconColor}
                    onMouseEnter={() => setAddIconColor("#242526")}
                    onMouseLeave={() => setAddIconColor("#FFF")}
                    size={250}
                />
            </div>
        )
    );
}

ProjectCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    owner: PropTypes.object,
    isAddButton: PropTypes.bool,
    addOnClick: PropTypes.func
}

export default ProjectCard;