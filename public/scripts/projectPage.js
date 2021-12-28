document.title = window.location.pathname.split("/")[2] + " by " + 
                 window.location.pathname.split("/")[1] + " | SoftVerse";

( function () { // self invoking post-function 

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
        url: window.location.pathname,
        datatype: "json",
        cache : false,
        data: {
            username: sessionCookie.username,
            session_id: sessionCookie.session_id,
            project_name: window.location.pathname.split('/')[2].replace("-", " "),
            owner: window.location.pathname.split('/')[1]
        },
        success: function(res) {
            
            if(res === "invalid session") {
                deleteCookie();
                window.location.href = "/";
            }
            else if(res === "unauthorized") {
                
            }
            else {
                let detailsCard = document.createElement("project-details");
                detailsCard.projectName = window.location.pathname.split("/")[2];
                detailsCard.projectOwner = window.location.pathname.split("/")[1];
                detailsCard.projectDescription = res.description;
                document.getElementById("project-page-wrapper").prepend(detailsCard);
                
                let issuesWrapper = document.getElementById("issues-wrapper");

                fillIssueButtons(res.issues, issuesWrapper, true);
            }

        }
    });

}());

function deleteCookie() {
    document.cookie = "Softverse Session=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
}

function fillIssueButtons(issues, wrapper, type) {
    issues.forEach( issue => {
        let newButton = document.createElement("issue-button");
        newButton.setAll(
            issue._title,
            issue._type,
            issue._priority,
            issue._creator,
            issue._issueID
        );

        if(newButton._type === type) {
            wrapper.prepend(newButton);
        }
    });
}