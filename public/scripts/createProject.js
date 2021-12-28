function validateSession() {

    let index = document.cookie.indexOf("Softverse Session=");

    if( index === -1  ) {
        window.location.href = '/';
    }

    let cookieStrings = document.cookie.split(";");

    let sessionCookie = null;

    cookieStrings.forEach( cookieString => {
        if(cookieString.startsWith("Softverse Session=")) {
            sessionCookie = JSON.parse(cookieString.substring( 18, cookieString.length ));
        }
    });

    $.ajax({
        type: "POST",
        url: "/create-project",
        datatype: "json",
        cache : false,
        data: {
            username: sessionCookie.username,
            session_id: sessionCookie.session_id
        },
        success: function(res) {
            
            if(res === "fail") {
                deleteCookie();
                window.location.href = '/';
            }
            
        }
    });

}

function validateInput() {
    let nameValidity = isValidProjectName();
    let descValidity = isValidProjectDescription();

    return descValidity && nameValidity;
}

function isValidProjectName() {

    let nameErrorTag = document.getElementById("create-project-name-error-tag");

    if( document.getElementById("project-name-input").value.length < 4 
    || document.getElementById("project-name-input").value.length > 50 ) 
    {
        nameErrorTag.innerText = "Project name be from 4-50 characters."
        return false;
    }

    let re = /^[a-zA-Z0-9 ]*$/;
    
    if(!re.test( document.getElementById("project-name-input").value )) { // must be alphanumeric, with spaces
        nameErrorTag.innerText = "While we love your funky characters, please use only letters, numbers, and spaces.";
        return false;
    }

    if(!document.getElementById("project-name-input").value.trim()) {
        nameErrorTag.innerText = "Please use characters other than spaces as well.";
        return false;
    }

    nameErrorTag.innerText = "";
    return true;

}

function isValidProjectDescription() {
    let descErrorTag = document.getElementById("create-project-description-error-tag");

    if( document.getElementById("create-description-area").value.length < 4 ) {
        descErrorTag.innerText = "Project description must be at least 4 characters."
        return false;
    }

    descErrorTag.innerText = "";
    return true;
}

function getUsernameFromCookie() {
    let index = document.cookie.indexOf("Softverse Session=");

    if( index === -1  ) {
        window.location.href = '/';
    }

    let cookieStrings = document.cookie.split(";");

    let sessionCookie = null;

    cookieStrings.forEach( cookieString => {
        if(cookieString.startsWith("Softverse Session=")) {
            sessionCookie = JSON.parse(cookieString.substring( 18, cookieString.length ));
        }
    });

    if(!sessionCookie.username) {
        return false;
    }

    return sessionCookie.username;
}

function sendProject() {

    document.getElementById("create-project-button").innerText = "Please Wait";

    let inputValidity = validateInput();

    if(inputValidity === false) {
        document.getElementById("create-project-button").innerText = "Create";
        return;
    }

    let projectName = document.getElementById("project-name-input").value;
    let projectDesc = document.getElementById("create-description-area").value;

    let username = getUsernameFromCookie();


    $.ajax({
        type: "POST",
        url: "/create-project/create",
        datatype: "json",
        cache : false,
        data: {
            username: username,
            project_name: projectName,
            project_description: projectDesc
        },
        success: function(res) {
            
            if(res === "taken") {
                document.getElementById("create-project-name-error-tag").innerText = "Sorry, one of your projects already has this name.";
            } else if (res === "success") {
                window.location.href = '/dashboard';
            }

            document.getElementById("create-project-button").innerText = "Create";
            
        }
    });

}

function deleteCookie() {
    document.cookie = "Softverse Session=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
}