document.title = window.location.pathname.split("/")[2] + " by " + 
                 window.location.pathname.split("/")[1] + " | SoftVerse";

let openIssues = [];
let closedIssues = [];
let members = [];

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

                setIssueLists(res.issues);
                fillIssueButtons(openIssues, issuesWrapper);
                document.getElementById("open-issues-button").style.background = "#1d2635";
            }

        }
    });

}());

function deleteCookie() {
    document.cookie = "Softverse Session=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
}

function setIssueLists(issues) {
    issues.forEach( issue => {
        if(issue._type === true) {
            openIssues.push(issue);
        }
        else {
            closedIssues.push(issue);
        }
    });
}

function fillIssueButtons(issues, wrapper) {
    issues.forEach( issue => {
        let newButton = document.createElement("issue-button");
        newButton.setAll(
            issue._title,
            issue._type,
            issue._priority,
            issue._creator,
            issue._issueID
        );

        wrapper.prepend(newButton);
    });
}

function openIssuesOnClick() {

    document.getElementById("open-issues-button").style.background = "#1d2635";

    document.getElementById("closed-issues-button").style.background = "#0d1117";

    let issuesWrapper = document.getElementById("issues-wrapper");
    issuesWrapper.innerHTML = '';
    fillIssueButtons(openIssues, issuesWrapper);
}

function closedIssuesOnClick() {

    document.getElementById("open-issues-button").style.background = "#0d1117";

    document.getElementById("closed-issues-button").style.background = "#1d2635";

    let issuesWrapper = document.getElementById("issues-wrapper");
    issuesWrapper.innerHTML = '';
    fillIssueButtons(closedIssues, issuesWrapper);
}