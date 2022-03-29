import React  from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const whiteLogoPath = "../../../content/images/devwire_logo_white.svg";

export const NavbarActiveItems =  {
    Project: "project",
    Profile: "profile",
    About: "about"
}

const Navbar = ({
    renderDrawer = null,
    activeItem = null,
    userID = null,
}) => {

    // renders the drawer open button
    const renderDrawerButton = () => {
        if (!renderDrawer) return null;

        let icon = (
            <HamburgerIcon
                color={"#FFF"}
            />
        );

        return (
            <IconButton
                icon={icon}
                style={{
                    backgroundColor: "#202124",
                    marginTop: "12px",
                    marginRight: "30px",
                    border: "solid 1px #484F58",
                }}
            />
        );
    }

    const renderListItems = () => {

        let itemsElements = [];

        const titleAndRouteByItem = { 
            Project: { title: "Projects", route: "/projects" },
            Profile: { title: "Profile", route: userID ? `users/${userID}` : "/" },
            About: { title: "About", route: "/about" },
        }

        for (let item in NavbarActiveItems) {

            itemsElements.push((
                <li>
                    <Link 
                        to={titleAndRouteByItem[item].route}
                        style={ activeItem === NavbarActiveItems[item] 
                                ? { color: "#B98FDD" } 
                                : {  }
                        }
                    >
                        {titleAndRouteByItem[item].title}
                    </Link>
                </li>
            ));
        }

        return itemsElements;
    }

     return (
        <nav className={styles.navbar}>
            <div 
                className={styles.navleft}
                style={{ marginLeft: renderDrawer ? "60px" : "80px" }}
            >
                {renderDrawerButton()}
                <Link
                    to="/"
                    onClick={(e) => window.location === "/" && e.preventDefault()}
                >
                    <img
                        className={styles.navlogo}
                        src={whiteLogoPath}
                    />
                </Link>
                <ul className={styles.navlist}>
                    {renderListItems()}
                </ul>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    renderDrawer: PropTypes.func,
    activeItem: PropTypes.string,
    userID: PropTypes.string,
}

export default Navbar;
