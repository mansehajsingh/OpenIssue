import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../../redux/slices/userSlice';
import useIsMounted from "../../../hooks/useIsMounted";
import { useToast } from '@chakra-ui/react';
import Navbar, { NavbarActiveItems } from '../../Navbar/Navbar';
import Footer from "../../Footer";
import VerticalSpacer from "../../VerticalSpacer";
import styles from "./styles.module.scss";

const getErrorText = (username, first_name, last_name) => {
    let usernameErrorText = "";
    let firstNameErrorText = "";
    let lastNameErrorText = "";

    if (!username?.match(/^[a-zA-Z0-9_]+$/)) {
        usernameErrorText = "Username must be alphanumeric with underscores.";
    }

    if (username?.length < 4 || username?.length > 20) {
        usernameErrorText = "Username must be between 4-20 characters long, inclusive.";
    }

    if (!first_name) firstNameErrorText = "First name cannot be empty.";
    if (!last_name) lastNameErrorText = "Last name cannot be empty.";

    return [usernameErrorText, firstNameErrorText, lastNameErrorText];
}

const ProfilePage = ({}) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const toast = useToast();

    const isMounted = useIsMounted();

    const [formState, setFormState] = useState({
        username: user.identity?.username || "",
        first_name: user.identity?.first_name || "",
        last_name: user.identity?.last_name || "",
    });

    const [errorText, setErrorText] = useState({
        username: "",
        first_name: "",
        last_name: "",
    });

    useEffect(() => {
        if (user.userEditSuccess && isMounted) {
            toast({
                title: "Hooray!",
                description: "Profile changed successfully",
                status: "success",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
        } else if (user.userEditSuccess === false && isMounted) {
            toast({
                title: "Oops",
                description: user.userEditMessage,
                status: "error",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
        }   
    }, [user.userEditSuccess]);

    useEffect(() => {
        setFormState({
            username: user.identity?.username,
            first_name: user.identity?.first_name,
            last_name: user.identity?.last_name,
        });
    }, [user.identity]);

    useEffect(() => {
        const [usernameErrorText, firstNameErrorText, lastNameErrorText] = getErrorText(
            formState.username, formState.first_name, formState.last_name
        );
        setErrorText({
            username: usernameErrorText,
            first_name: firstNameErrorText,
            last_name: lastNameErrorText,
        });
    }, [formState]);

    const applyChanges = () => {
        dispatch(editUser({
            user_id: user.identity?.id,
            username: formState.username,
            first_name: formState.first_name,
            last_name: formState.last_name,
        }));
    }

    const handleFormStateChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    }

    const applyButtonIsDisabled = () => {
        const [usernameErrorText, firstNameErrorText, lastNameErrorText] = getErrorText(
            formState.username, formState.first_name, formState.last_name
        );

        return (formState.username === user.identity?.username &&
               formState.first_name === user.identity?.first_name &&
               formState.last_name === user.identity?.last_name) ||
               (usernameErrorText || firstNameErrorText || lastNameErrorText);
    }

    return(
        <>
        <title>Profile | Devwire</title>
        <Navbar activeItem={NavbarActiveItems.Profile}/>
        <VerticalSpacer/>
        <main className={styles.content}>
            <div className={styles.header}>
                <h2 className={styles.title}>Profile</h2>
                <form className={styles.profile_form} onSubmit={e => { e.preventDefault(); }}>
                    <div className={styles.form_section}>
                        <label className={styles.username_label}>Username</label>
                        <div className={styles.input_wrapper}>
                            <input 
                                className={styles.username_input}
                                value={formState.username}
                                name="username"
                                onChange={handleFormStateChange}
                            />
                            <p className={styles.error_text}>{errorText.username}</p>
                        </div>
                    </div>
                    <div className={styles.form_section}>
                        <label className={styles.first_name_label}>First Name</label>
                        <div className={styles.input_wrapper}>
                            <input 
                                className={styles.username_input}
                                value={formState.first_name}
                                name="first_name"
                                onChange={handleFormStateChange}
                            />
                            <p className={styles.error_text}>{errorText.first_name}</p>
                        </div>
                    </div>
                    <div className={styles.form_section}>
                        <label className={styles.last_name_label}>Last Name</label>
                        <div className={styles.input_wrapper}>
                            <input 
                                className={styles.last_name_input}
                                value={formState.last_name}
                                name="last_name"
                                onChange={handleFormStateChange}
                            />
                            <p className={styles.error_text}>{errorText.last_name}</p>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        className={styles.apply_button}
                        disabled={applyButtonIsDisabled()}
                        onClick={applyChanges}
                    >
                        Apply Changes
                    </button>
                </form>
            </div>
        </main>
        <Footer />
        </>
    );
}

export default ProfilePage;