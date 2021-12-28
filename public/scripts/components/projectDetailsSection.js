class ProjectDetailsSection extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this._projectName = "Name";
        this._projectDescription = "Description";
        this._projectOwner = "owner";
        this.template = document.createElement('template');
    }

    connectedCallback() {
        this.render();
    }

    render() {

        this.template.innerHTML = /*html*/
        `
        <link href = "/public/stylesheets/style.css" type = "text/css" rel = "stylesheet">
        <div class = "project-details-wrapper">
            <h1 class = "project-details-name">${ this._projectName }</h1>
            <p class = "project-details-owner">
                Owned by: 
                <a class = "project-details-username" href = "/${ this._projectOwner }">
                    ${ this._projectOwner }
                </a>
            </p>
            <p class = "project-details-description">${ this._projectDescription }</p>
        </div>
        `;

        this.shadow.appendChild(this.template.content.cloneNode(true));
    }

    set projectName(projectName) {
        this._projectName = projectName;
    }

    set projectDescription(projectDescription) {
        this._projectDescription = projectDescription;
    }

    set projectOwner(projectOwner) {
        this._projectOwner = projectOwner;
    }

}

customElements.define("project-details", ProjectDetailsSection);