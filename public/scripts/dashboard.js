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
        url: "/dashboard",
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
            else {
                loadProjects(res);
            }
            
        }
    });

}

function loadProjects(projects) {

    let wrapper = document.getElementById("projects-wrapper");

    projects.forEach( project => {
        let card = document.createElement("project-card");
        card.projectName = project._projectName;
        card.projectDescription = project._projectDescription;
        card.projectOwner = project._projectOwner;
        wrapper.append(card);
    });

}

function sendToCreate() {
    window.location.href = '/create-project';
}

function deleteCookie() {
    document.cookie = "Softverse Session=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
}