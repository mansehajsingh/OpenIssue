function formBuffer() { // checks validity of form fields and sends data if valid
    let validUser = isValidUsername();
    let validPass = isValidPassword();

    if(validUser && validPass) {
        sendFormData();
    }
}

function isValidUsername() {
    let text = document.getElementById("username-input").value;
    
    if(!text) { // if text is empty
        document.getElementById("login-username-error").innerHTML = "Please enter a username.";
        return false;
    }

    if(text.length < 4 || text.length > 20) { // must be between 4-20 characters
        document.getElementById("login-username-error").innerHTML = "Username must be between 4-20 characters.";
        return false;
    }

    re = /^[a-zA-Z0-9]*$/;
    
    if(!re.test(text)) { // must be alphanumeric 
        document.getElementById("login-username-error").innerHTML = "Username must be alphanumeric, and contain at least one letter.";
        return false;
    }

    document.getElementById("login-username-error").innerHTML = "";
    return true;

}

function isValidPassword() {
    let text = document.getElementById("password-input").value;

    if(!text) { // if text is empty
        document.getElementById("login-password-error").innerHTML = "Please enter a password.";
        return false;
    }
    
    if(text.length < 4 || text.length > 20) { // must be between 4-20 characters
        document.getElementById("login-password-error").innerHTML = "Password must be between 4-20 characters.";
        return false;
    }

    if(text.includes(' ')) {
        document.getElementById("login-password-error").innerHTML = "Password cannot contain spaces.";
        return false;
    }

    document.getElementById("login-password-error").innerHTML = "";
    return true;

}

function sendFormData() {

    document.getElementById("login-submit-button").innerHTML = "Please Wait";

    $.ajax({
        type: "POST",
        url: "/login",
        datatype: "json",
        cache : false,
        data: {
            username: $("#username-input").val(),
            password: $("#password-input").val()
        },
        success: function(res) {
            if(res === "400") {
                document.getElementById("login-password-error").innerHTML = "Invalid username or password";
            } else {
                window.location.href = "/";
            }
            document.getElementById("login-submit-button").innerHTML = "Login";
        }
    });
}