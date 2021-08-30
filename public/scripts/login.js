function loginFormValidity() {
    return isValidUsername() && isValidPassword();
}

function isValidUsername() {
    let text = document.getElementById("username-input").value;
    
    if(!text) { // if text is empty
        document.getElementById("login-username-error").innerHTML = "Please enter a username.";
        return false;
    }

    if(text.length < 4 || text.length > 20) {
        document.getElementById("login-username-error").innerHTML = "Username must be between 4-20 characters.";
        return false;
    }

    re = /^[a-zA-Z0-9]*$/;
    
    if(!re.test(text)) {
        document.getElementById("login-username-error").innerHTML = "Username must be alphanumeric, and contain at least one letter.";
        return false;
    }

}

function isValidPassword() {
    let text = document.getElementById("password-input").value;

    if(!text) { // if text is empty
        document.getElementById("login-password-error").innerHTML = "Please enter a password.";
        return false;
    }
}