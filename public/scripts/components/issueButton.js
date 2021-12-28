class IssueButton extends HTMLElement {

    constructor() {
        super();
        this._title = "Title";
        this._type = true;
        this._priority = 1;
        this._creator = "Creator";
        this._issueID = "0000000";
        this.shadow = this.attachShadow({ mode: "open" });
        this.template = document.createElement('template');
    }

    connectedCallback() {
        this.render();
    }

    render() {

        this.template.innerHTML = /*html*/
        `
        <link href = "/public/stylesheets/style.css" type = "text/css" rel = "stylesheet">
        <div class = "issue-button-wrapper">
            <div class = "issue-button-left-side">
                <h3 class = "issue-button-title">${ this._title }</h3>
                <p class = "issue-button-priority-tag-${ this._priorityToString(this._priority) }">${ this._priorityToString(this._priority) }</p>
                <a class = "${ this._type ? "open" : "closed" }-issue-button-type">${ this._type ? "Open" : "Closed" }</a> 
            </div>
            <div class = "issue-button-right-side">
                <p class = "issue-button-creator-tag">opened by <strong>${ this._creator }</strong></p>
                <p class = "issue-button-id">issue id <strong>${this._issueID}</strong></p>
            </div>
        </div>
        `;

        this.shadow.appendChild(this.template.content.cloneNode(true));
    }

    setAll(title, type, priority, creator, issueID) {
        this._title = title;
        this._type = type;
        this._priority = priority;
        this._creator = creator;
        this._issueID = issueID;
    }

    _priorityToString(priority) {
        switch(priority) {
            case 1:
                return "LOW";
            case 2:
                return "MEDIUM";
            case 3:
                return "HIGH";
        }
    }

}

customElements.define("issue-button", IssueButton);