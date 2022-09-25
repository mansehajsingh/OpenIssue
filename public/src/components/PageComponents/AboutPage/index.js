import React from "react";
import Navbar, { NavbarActiveItems } from "../../Navbar/Navbar";
import VerticalSpacer from "../../VerticalSpacer";
import Footer from "../../Footer";
import styles from "./styles.module.scss";

const AboutPage = ({}) => {

    return (
        <>
            <Navbar activeItem={NavbarActiveItems.About}/>
            <VerticalSpacer />
            <title>About | Devwire</title>
            <main className={styles.content}>
                <img className={styles.image} src="../../../content/images/devwire_logo_color.svg"/>
                <h2 className={styles.heading}>A platform to organize software development.</h2>
                <p className={styles.description}>Devwire is a free-to-use platform for bringing together a team of developers to create a refined, well-oiled product. Create issues, add team members, reply to issues, and share ideas in a centralized format. The powerful markdown editor makes it incredibly easy to write well produced documents, with full support for inserting code snippets in many languages.</p>
                <p className={styles.description}>Stack:</p>
                <table className={styles.stack_table}>
                    <tbody>
                        <tr>
                            <td className={styles.light_table_cell}><p className={styles.table_text}>PostgreSQL</p></td>
                            <td className={styles.light_table_cell}><img src="../../../content/images/stack-icons/postgres.svg"/></td>
                        </tr>
                        <tr>
                            <td className={styles.dark_table_cell}><p className={styles.table_text}>Express</p></td>
                            <td className={styles.dark_table_cell}><img src="../../../content/images/stack-icons/express.svg"/></td>
                        </tr>
                        <tr>
                            <td className={styles.light_table_cell}><p className={styles.table_text}>React</p></td>
                            <td className={styles.light_table_cell}><img src="../../../content/images/stack-icons/react.svg"/></td>
                        </tr>
                        <tr>
                            <td className={styles.dark_table_cell}><p className={styles.table_text}>Node.js</p></td>
                            <td className={styles.dark_table_cell}><img src="../../../content/images/stack-icons/node.svg"/></td>
                        </tr>
                    </tbody>
                </table>
            </main>
            <Footer />
        </>
    )

}

export default AboutPage;