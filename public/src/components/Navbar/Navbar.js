import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { IoExit } from "react-icons/io5";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Tooltip,
} from "@chakra-ui/react";
import ConfirmationModal from "../ConfirmationModal";
import { logoutUser } from "../../redux/slices/userSlice";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const whiteLogoPath = "../../../content/images/devwire_logo_white.svg";

/* component-related constants */
export const NavbarActiveItems = {
    Project: "project",
    About: "about",
    Profile: "profile",
};

/* component definition */
const Navbar = ({ activeItem = null, userID = null }) => {
    /* state */
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { 
        isOpen: signOutIsOpen,
        onOpen: signOutOnOpen,
        onClose: signOutOnClose,
    } = useDisclosure();

    const signedIn = useSelector((state) => !!state.user.identity);
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* effects */
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);

    useEffect(() => {
        if (user.logoutSuccess) {
            navigate("/");
        }
    }, [user.logoutSuccess]);

    // usage functions
    const logoutOnClick = () => {
        dispatch(logoutUser({}));
    }

    /* render functions */
    const renderDrawerButton = () => {
        let icon = <HamburgerIcon color={"#FFF"} />;

        return (
            <IconButton
                icon={icon}
                onClick={onOpen}
                style={{
                    backgroundColor: "#202124",
                    margin: "12px 40px 0 0",
                    border: "solid 1px #484F58",
                }}
            />
        );
    };

    const renderListItems = () => {
        let itemsElements = [];

        const titleAndRouteByItem = {
            Project: { title: "Projects", route: "/projects" },
            Profile: {
                title: "Profile",
                route: userID ? `users/${userID}` : "/",
            },
            About: { title: "About", route: "/about" },
        };

        for (let item in NavbarActiveItems) {
            itemsElements.push(
                <li key={item}>
                    <Link
                        to={titleAndRouteByItem[item].route}
                        className={
                            activeItem === NavbarActiveItems[item]
                                ? styles.active_navlink
                                : styles.inactive_navlink
                        }
                    >
                        {titleAndRouteByItem[item].title}
                    </Link>
                </li>
            );
        }
        return itemsElements;
    };

    const renderDrawer = () => {
        return (
            <Drawer 
                placement="right" 
                onClose={onClose} 
                isOpen={isOpen}
                size="full"
            >
                <DrawerOverlay/>
                <DrawerContent opacity={0.95}>
                    <DrawerHeader 
                        className={styles.drawer_header} 
                        bgColor="#202124" 
                        border="solid 0px"
                    >
                        <IconButton
                            icon={<ChevronLeftIcon color="#FFF"/>}
                            onClick={onClose}
                            style={{
                                backgroundColor: "#202124",
                                margin: "0 40px 0 0",
                                border: "solid 1px #484F58",
                            }}
                        />
                        <img className={styles.drawer_logo} src={whiteLogoPath} /> 
                    </DrawerHeader>
                    <DrawerBody className={styles.drawer_body} border="solid 0px">
                        <div className={styles.drawer_body_content}>
                            <Link
                                to={"/projects"}
                                className={styles.drawer_link}
                            >
                                Projects
                            </Link>
                            <Link
                                to={"/about"}
                                className={styles.drawer_link}
                            >
                                About
                            </Link>
                            <Link
                                to={`/about/${userID}`}
                                className={styles.drawer_link}
                            >
                                Profile
                            </Link>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <>
        <nav className={styles.navbar}>
            <div className={styles.navleft}>
                <Link
                    to="/"
                >
                    <img className={styles.navlogo} src={whiteLogoPath} />
                </Link>
                {windowWidth > 500 && (
                    <ul className={styles.navlist}>{renderListItems()}</ul>
                )}
            </div>
            <div>
                {signedIn && (
                    <Tooltip label={"Sign Out"}>
                        <IconButton
                            icon={<IoExit color="FFF"/>}
                            style={{
                                backgroundColor: "#202124",
                                margin: "12px 20px 0 0",
                                border: "solid 1px #484F58",
                                paddingLeft: "3px"
                            }}
                            onClick={() => signOutOnOpen()}
                        />
                    </Tooltip>
                )}
                {windowWidth < 500 && renderDrawerButton()}
            </div>
        </nav>
        {renderDrawer()}
        <ConfirmationModal
            text="Are you sure you want to sign out?"
            buttonText="Sign Out"
            isOpen={signOutIsOpen}
            onClose={signOutOnClose}
            action={logoutOnClick}
        />
        </>
    );
};

/* component prop types */
Navbar.propTypes = {
    activeItem: PropTypes.string,
    userID: PropTypes.string,
};

export default Navbar;
