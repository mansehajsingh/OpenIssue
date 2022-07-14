import React from "react";
import styles from "./styles.module.scss";

const Footer = (props) => {
    return (
        <section className={styles.footer}>
            <h3 className={styles.cr_tag}>© Mansehaj Singh 2021 - 2022</h3>
            <p className={styles.personal_tag}>Made with ❤️ (and a little ☕) in Calgary, Alberta.</p>
            <a href="https://github.com/mansehajsingh/devwire" target="_blank" className={styles.github}>
                GitHub Repo
            </a>
        </section>
    );
}

export default Footer;