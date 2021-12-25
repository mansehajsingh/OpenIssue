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

    if( document.getElementById("project-name-input").value.length < 4 ) {
        nameErrorTag.innerText = "Project name must be at least 4 characters."
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
                document.getElementById("create-project-name-error-tag").innerText = "Sorry, a project already exists with this name.";
            } else if (res === "success") {
                window.location.href = '/dashboard';
            }

            document.getElementById("create-project-button").innerText = "Create";
            
        }
    });

}