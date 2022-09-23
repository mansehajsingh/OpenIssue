import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const LandingInfoCard = ({
    imagePath,
    imageAlignment = "left",
    heading = "Title",
    content = "Put your content here.",
    bgColor = "#FFF",
    buttonText = "Click here",
    buttonProps = {}
}) => {

    const renderImage = () => {
        return (
            <img
                className={styles.image}
                src={imagePath}
            />
        );
    }

    const renderText = () => {
        return (
            <div className={styles.text_container}>
                <h4 className={styles.heading}>{heading}</h4>
                <p className={styles.content}>{content}</p>
            </div>
        );
    }

    return (
        <div className={styles.container} style={{ backgroundColor: bgColor }}>
            {imageAlignment === "left" ? (
                <>
                    {renderImage()}
                    {renderText()}
                </>
            ) : (
                <>
                    {renderText()}
                    {renderImage()}
                </>
            )}
        </div>
    );
}

LandingInfoCard.propTypes = {
    imagePath: PropTypes.string.isRequired,
    imageAlignment: PropTypes.string,
    heading: PropTypes.string,
    content: PropTypes.string,
    bgColor: PropTypes.string,
    buttonText: PropTypes.string,
    buttonProps: PropTypes.object,
}

export default LandingInfoCard;